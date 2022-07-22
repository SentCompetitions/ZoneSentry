namespace ZoneSentry.Models;

public class ResidentialComplex
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string City { get; set; }
    
    public ConstructionCompany ConstructionCompany { get; set; }
    public int ConstructionCompanyId { get; set; }
    
    public List<House> Houses { get; set; }
}

public class ResidentialComplexDTO
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string City { get; set; }
    
    public int ConstructionCompanyId { get; set; }
    
    public List<int> Houses { get; set; }
}

public class ResidentialComplexCreate
{
    public string Name { get; set; }
    public string City { get; set; }
}