package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"os"
	"strconv"
	"sync"

	"github.com/agonper/multi-client-grpc/api"
	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"
)

var (
	// tls      = flag.Bool("tls", false, "Connection uses TLS if true, else plain TCP")
	// certFile = flag.String("cert_file", "", "The TLS cert file")
	// keyFile  = flag.String("key_file", "", "The TLS key file")
	port = flag.Int("port", 10000, "The server port")
)

type ephemeralNotesServer struct {
	api.UnimplementedEphemeralNotesServer
	news           chan *api.Note
	rw             sync.RWMutex // Protects ephemeralNotes
	ephemeralNotes []*api.Note
}

func (s *ephemeralNotesServer) PublishNote(ctx context.Context, note *api.Note) (*api.Note, error) {
	note.PublishedAt = ptypes.TimestampNow()
	log.Printf("new note: %v", note)
	s.rw.Lock()
	s.ephemeralNotes = append(s.ephemeralNotes, note)
	s.rw.Unlock()
	go func() { s.news <- note }()
	return note, nil
}
func (s *ephemeralNotesServer) StreamNotes(_ *empty.Empty, stream api.EphemeralNotes_StreamNotesServer) error {
	log.Print("Stream request started")
	notes := s.readOnlyNotes()
	if err := stream.Send(&api.StreamNotesResponse{Notes: notes}); err != nil {
		log.Printf("stream error: %v", err)
		return err
	}
	for {
		select {
		case <-stream.Context().Done():
			log.Print("Stream closed by client")
			return nil
		case <-s.news:
		}
		notes = s.readOnlyNotes()
		if err := stream.Send(&api.StreamNotesResponse{Notes: notes}); err != nil {
			log.Printf("stream error: %v", err)
			return err
		}
	}
}

func (s *ephemeralNotesServer) readOnlyNotes() []*api.Note {
	s.rw.RLock()
	defer s.rw.RUnlock()

	rn := make([]*api.Note, len(s.ephemeralNotes))
	copy(rn, s.ephemeralNotes)
	return rn
}

func newServer() *ephemeralNotesServer {
	s := &ephemeralNotesServer{news: make(chan *api.Note)}
	return s
}

func serverPort() int {
	switch os.Getenv("PORT") {
	case "":
		return *port
	default:
		envPort, err := strconv.Atoi(os.Getenv("PORT"))
		if err != nil {
			log.Fatalf("env variable PORT does not contain a number: %v", err)
		}
		return envPort
	}
}

func main() {
	flag.Parse()
	address := fmt.Sprintf(":%d", serverPort())

	lis, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	api.RegisterEphemeralNotesServer(grpcServer, newServer())
	log.Printf("Server will start listening requests at address: %v", address)

	grpcServer.Serve(lis)
}
