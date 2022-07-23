namespace ZoneSentry.Models;

public class RealtyServiceOrder
{
    public int Id { get; set; }
    
    public int Cost { get; set; }
    public DateTime Date { get; set; }

    public Realty Realty { get; set; }
    public RealtyService RealtyService { get; set; }
    
    public List<RealtyServicePayment> Payments { get; set; }
    
    public bool CompanyOrdered { get; set; }
    public ApplicationUser? Orderer { get; set; }
}

public class RealtyServiceOrderDTO
{
    public int Id { get; set; }
    
    public int Cost { get; set; }
    public DateTime Date { get; set; }
    public bool Active { get; set; }

    public RealtyUserView Realty { get; set; }
    public RealtyServiceDTO RealtyService { get; set; }
    
    public bool CompanyOrdered { get; set; }
    public ApplicationUserDTO? Orderer { get; set; }
}