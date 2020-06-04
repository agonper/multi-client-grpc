gcloud run deploy api-gateway \
      --image="eu.gcr.io/multi-client-grpc/endpoints-runtime-serverless:api-gateway-3t5ec74iwa-ew.a.run.app-2020-06-04r0" \
      --allow-unauthenticated \
      --platform managed \
      --project multi-client-grpc