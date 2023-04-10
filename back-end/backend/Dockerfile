FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

RUN dotnet add package Microsoft.AspNetCore.Cors
RUN dotnet add package Microsoft.AspNetCore
RUN dotnet add package dotenv.net
RUN dotnet add package MySql.Data
RUN dotnet add package MailKit
RUN dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 6.0.0
RUN dotnet add package Microsoft.EntityFrameworkCore
RUN dotnet add package Microsoft.EntityFrameworkCore.Design
RUN dotnet add package Microsoft.EntityFrameworkCore.Tools
RUN dotnet add package Microsoft.IdentityModel.Tokens
# RUN dotnet add package BCrypt.Net-Next

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .

CMD ["dotnet", "backend.dll"]
