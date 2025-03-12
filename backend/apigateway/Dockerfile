# Use a lightweight base image with Java runtime
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the executable jar from the target folder into the container
COPY target/restaurantdiscovery-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your application runs on (adjust if needed)
EXPOSE 8080

# Set the entrypoint to run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
