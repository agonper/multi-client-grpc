package me.agonper.multiclientgrpc;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.google.protobuf.Timestamp;

import java.util.Date;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import me.agonper.multiclientgrpc.apiclient.EphemeralNotesGrpc;
import me.agonper.multiclientgrpc.apiclient.Note;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    private static final String HOST = "api-gateway-3t5ec74iwa-ew.a.run.app";
    private static final int PORT = 443;

    private TextView resultText;
    private EphemeralNotesGrpc.EphemeralNotesStub client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        resultText = findViewById(R.id.resultText);

        ManagedChannel channel = ManagedChannelBuilder.forAddress(HOST, PORT).build();
        client = EphemeralNotesGrpc.newStub(channel);

        final Note firstNote = createNote("Hello from an Android client!");
        client.publishNote(firstNote, new StreamObserver<Note>() {
            @Override
            public void onNext(Note value) {
                String result = String.format("Publication result: %s", value);
                Log.i(TAG, result);
                updateTextResult(result);
            }

            @Override
            public void onError(Throwable t) {
                Log.e(TAG, String.format("Error occurred on publication: %s", t.getMessage()));
            }

            @Override
            public void onCompleted() {
                Log.d(TAG, "Done publishing");
            }
        });
    }

    private Note createNote(String message) {
        Date now = new Date();
        Timestamp createdAt = Timestamp.newBuilder()
                .setSeconds(now.getTime() / 1000)
                .setNanos((int) (now.getTime() % 1000 * 1e6))
                .build();
        return Note.newBuilder()
                .setMessage(message)
                .setCreatedAt(createdAt)
                .build();
    }

    private void updateTextResult(final String text) {
        this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                resultText.setText(text);
            }
        });
    }
}
