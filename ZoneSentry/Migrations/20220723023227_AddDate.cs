using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class AddDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "RealtyServiceOrders",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "RealtyServiceOrders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "RealtyServiceOrders");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "RealtyServiceOrders");
        }
    }
}
