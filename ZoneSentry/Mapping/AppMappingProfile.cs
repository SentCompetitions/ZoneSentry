using AutoMapper;
using ZoneSentry.Models;

namespace ZoneSentry.Mapping;

public class AppMappingProfile : Profile
{
    public AppMappingProfile()
    {
        CreateMap<ApplicationUser, ApplicationUserDTO>();
        
        CreateMap<ResidentialComplexCreate, ResidentialComplex>();
        CreateMap<HouseCreate, House>();
        CreateMap<RealtyCreate, Realty>();
        
        CreateMap<ConstructionCompany,ConstructionCompanyUserView>();
        CreateMap<ResidentialComplex,ResidentialComplexUserView>();
        CreateMap<House,HouseUserView>();
        CreateMap<Realty,RealtyUserView>();
        CreateMap<RentAgreement,RentAgreementUserView>();
        CreateMap<RentPayment,RentPaymentUserView>();

        CreateMap<ConstructionCompany, ConstructionCompanyDTO>().ForMember(
            c => c.ResidentialComplexes,
            o => o.MapFrom(c => c.ResidentialComplexes.Select(r => r.Id))
        );

        CreateMap<ResidentialComplex, ResidentialComplexDTO>().ForMember(
            c => c.Houses,
            o => o.MapFrom(c => c.Houses.Select(r => r.Id))
        );

        CreateMap<House, HouseDTO>().ForMember(
            c => c.Realties,
            o => o.MapFrom(c => c.Realties.Select(r => r.Id))
        );

        CreateMap<Realty, RealtyDTO>()
            .ForMember(
                c => c.RentAgreements,
                o => o.MapFrom(c => c.RentAgreements.Select(r => r.Id))
            ).ForMember(
                r => r.CurrentRentAgreement,
                o => o.MapFrom(r => r.CurrentRentAgreement.Id)
            );

        CreateMap<RentRequest, RentRequestDTO>();
        CreateMap<PurchaseRequest, PurchaseRequestDTO>();
    }
}