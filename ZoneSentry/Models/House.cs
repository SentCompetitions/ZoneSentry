namespace ZoneSentry.Models;

public class House
{
    public int Id { get; set; }
    
    public string Street { get; set; }
    public int HouseNumber { get; set; }
    // Строение
    public int? Building { get; set; }
    // Район
    public string? District { get; set; }
    // Корпус
    public int? Housing { get; set; }
    
    public ResidentialComplex ResidentialComplex { get; set; }
    public int ResidentialComplexId { get; set; }
    
    public List<Realty> Realties { get; set; }
}

public class HouseDTO
{
    public int Id { get; set; }
    
    public string Street { get; set; }
    public int HouseNumber { get; set; }
    // Строение
    public int? Building { get; set; }
    // Район
    public string? District { get; set; }
    // Корпус
    public int? Housing { get; set; }
    
    public int ResidentialComplexId { get; set; }
    
    public List<int> Realties { get; set; }
}