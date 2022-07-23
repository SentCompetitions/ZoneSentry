namespace ZoneSentry.Models;

public class RealtyServiceRequest
{
    public int Id { get; set; }
    
    public RealtyService RealtyService { get; set; }
    public Realty Realty { get; set; }
    
    public bool CompanyOrdered { get; set; }
    public ApplicationUser? Orderer { get; set; }
}

public class RealtyServiceRequestDTO
{
    public int Id { get; set; }
    
    public RealtyServiceDTO RealtyService { get; set; }
    public RealtyUserView Realty { get; set; }
    
    public bool CompanyOrdered { get; set; }
    public ApplicationUserDTO? Orderer { get; set; }
}