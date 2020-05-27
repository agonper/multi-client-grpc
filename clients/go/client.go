package main

import (
	"context"
	"flag"
	"io"
	"log"
	"time"

	"github.com/agonper/multi-client-grpc/api"
	"github.com/golang/protobuf/ptypes"
	"google.golang.org/grpc"
	pb "google.golang.org/protobuf/types/known/emptypb"
)

var (
	noteMessage = flag.String("note_message", "", "The content of the note to be published by the client")
	serverAddr  = flag.String("server_addr", "localhost:10000", "The server address in the format of host:port")
)

func publishNote(client api.EphemeralNotesClient, note *api.Note) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	note, err := client.PublishNote(ctx, note)
	if err != nil {
		return err
	}
	log.Printf("Published note: %v", note)
	return nil
}

func listenAndPrintNotes(client api.EphemeralNotesClient) {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()
	stream, err := client.StreamNotes(ctx, &pb.Empty{})
	if err != nil {
		log.Fatalf("Failed to open notes stream: %v", err)
	}
	for {
		update, err := stream.Recv()
		if err == io.EOF {
			log.Fatalf("server closed the stream!: %v", err)
		}
		if err != nil {
			log.Fatalf("error while reading notes: %v", err)
		}
		log.Print("Notes have been refreshed!")
		for _, note := range update.Notes {
			log.Print(note)
		}
	}
}

func createNote(message string) *api.Note {
	return &api.Note{
		Message:   message,
		CreatedAt: ptypes.TimestampNow(),
	}
}

func main() {
	flag.Parse()
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithInsecure())
	opts = append(opts, grpc.WithBlock())
	conn, err := grpc.Dial(*serverAddr, opts...)
	if err != nil {
		log.Fatalf("fail to dial: %v", err)
	}
	defer conn.Close()
	client := api.NewEphemeralNotesClient(conn)

	if *noteMessage != "" {
		err = publishNote(client, createNote(*noteMessage))
		if err != nil {
			log.Fatalf("failed to publish: %v", err)
		}
	} else {
		listenAndPrintNotes(client)
	}
}
