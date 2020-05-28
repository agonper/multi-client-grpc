gcloud run services add-iam-policy-binding ephemeral-notes-server \
      --member "serviceAccount:325943498259-compute@developer.gserviceaccount.com" \
      --role "roles/run.invoker" \
      --platform managed \
      --project multi-client-grpc