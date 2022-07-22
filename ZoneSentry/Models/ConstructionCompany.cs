namespace ZoneSentry.Models;

public class ConstructionCompany
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Country { get; set; }
    
    public List<ApplicationUser> Employees { get; set; }
    public List<ResidentialComplex> ResidentialComplexes { get; set; }
}

public class ConstructionCompanyDTO
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Country { get; set; }
    
    public List<int> ResidentialComplexes { get; set; }
}

public class ConstructionCompanyUserView
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Country { get; set; }
}