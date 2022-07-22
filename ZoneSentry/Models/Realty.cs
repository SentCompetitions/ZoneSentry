namespace ZoneSentry.Models;

public class Realty
{
    public int Id { get; set; }
    
    public int Number { get; set; }
    public int? PaymentPerMonth { get; set; }
    public int? SellCost { get; set; }
    
    public House House { get; set; }
    public int HouseId { get; set; }
    
    public ApplicationUser? Owner { get; set; }
    public bool OwnedByCompany { get; set; }
    
    public RealtyStatus RealtyStatus { get; set; }
    
    public List<RentAgreement> RentAgreements { get; set; }
    public List<RentRequest> RentRequests { get; set; } 
    public List<PurchaseRequest> PurchaseRequests { get; set; } 

    public RentAgreement? CurrentRentAgreement => RentAgreements != null ? RentAgreements.FirstOrDefault(a => a.Date > DateTime.Now && a.ExpirationDate < DateTime.Now) : null;
}

public enum RealtyStatus {
    NotForSale,
    ForRent,
    ForSale,
}

public class RealtyDTO
{
    public int Id { get; set; }
    
    public int Number { get; set; }
    public int? PaymentPerMonth { get; set; }
    public int? SellCost { get; set; }
    
    public int HouseId { get; set; }
    
    public ApplicationUserDTO? Owner { get; set; }
    public bool OwnedByCompany { get; set; }
    
    public List<int> RentAgreements { get; set; }

    public int? CurrentRentAgreement { get; set; }
}

public class RealtyCreate
{
    public int Number { get; set; }
}

public class RealtyUserView
{
    public int Id { get; set; }
    
    public int Number { get; set; }
    public int? PaymentPerMonth { get; set; }
    public int? SellCost { get; set; }
    
    public int HouseId { get; set; }
    
    public ApplicationUserDTO? Owner { get; set; }
    public bool OwnedByCompany { get; set; }
    
    public HouseUserView House { get; set; }
}