# ZoneSentry
### Before launch
- Set User Secret JWT:Key `dotnet user-secrets set JWT:Key "your key"`
- Install ef6 tools `dotnet tool install --global dotnet-ef`
  - Update Data Base `dotnet ef database update`
- Add dev certs `dotnet dev-certs https --trust`