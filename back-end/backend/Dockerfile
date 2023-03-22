# Use the official Microsoft .NET SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy the project file and restore dependencies
COPY backend.csproj ./
RUN dotnet restore

# Copy the remaining files and build the project
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official Microsoft ASP.NET runtime image for the production environment
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .

# Expose port 80 for the application
EXPOSE 80

# Start the application when the container starts
ENTRYPOINT ["dotnet", "backend.dll"]
