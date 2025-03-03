# Use a lightweight base image with Java runtime
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the executable jar from the target folder into the container
COPY target/restaurantdiscovery-0.0.1-SNAPSHOT.jar app.jar

# Copy wait-for-it.sh from your tools directory
COPY tools/wait-for-it.sh /wait-for-it.sh

# Make the script executable
RUN chmod +x /wait-for-it.sh

# Expose the port your service listens on (adjust if needed)
EXPOSE 8081

# Use wait-for-it to wait for mysql-discovery:3306 before starting
ENTRYPOINT ["/wait-for-it.sh", "mysql-discovery:3306", "--", "java", "-jar", "/app/app.jar"]