namespace ZoneSentry.Models;

public class RealtyServicePayment
{
    public int Id { get; set; }
    
    public int Payment { get; set; }
    public PaymentState PaymentState { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    
    public ConstructionCompany? ConstructionCompany { get; set; }
    public ApplicationUser? Orderer { get; set; }
    public RealtyServiceOrder? RealtyServiceOrder { get; set; }
}

public class RealtyServicePaymentDTO
{
    public int Id { get; set; }
    
    public int Payment { get; set; }
    public PaymentState PaymentState { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    
    public ConstructionCompanyUserView? ConstructionCompany { get; set; }
    public ApplicationUserDTO? Orderer { get; set; }
    public RealtyServiceOrderDTO? RealtyServiceOrder { get; set; }
}