using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class PaymentDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDate",
                table: "RentPayments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDate",
                table: "RealtyServicePayments",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "RentPayments");

            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "RealtyServicePayments");
        }
    }
}
