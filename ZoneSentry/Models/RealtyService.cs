namespace ZoneSentry.Models;

public class RealtyService
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Cost { get; set; }
    
    public ApplicationUser Provider { get; set; }
    
    public List<House> Scope { get; set; }
}

public class RealtyServiceDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Cost { get; set; }
    
    public ApplicationUserDTO Provider { get; set; }
}

public class RealtyServiceUpdate
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Cost { get; set; }
}