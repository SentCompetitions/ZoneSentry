using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class Services : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RealtyServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Cost = table.Column<int>(type: "INTEGER", nullable: false),
                    ProviderId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealtyServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealtyServices_AspNetUsers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HouseRealtyService",
                columns: table => new
                {
                    RealtyServicesId = table.Column<int>(type: "INTEGER", nullable: false),
                    ScopeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseRealtyService", x => new { x.RealtyServicesId, x.ScopeId });
                    table.ForeignKey(
                        name: "FK_HouseRealtyService_Houses_ScopeId",
                        column: x => x.ScopeId,
                        principalTable: "Houses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HouseRealtyService_RealtyServices_RealtyServicesId",
                        column: x => x.RealtyServicesId,
                        principalTable: "RealtyServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RealtyServiceOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Cost = table.Column<int>(type: "INTEGER", nullable: false),
                    RealtyId = table.Column<int>(type: "INTEGER", nullable: false),
                    RealtyServiceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealtyServiceOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealtyServiceOrders_Realties_RealtyId",
                        column: x => x.RealtyId,
                        principalTable: "Realties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RealtyServiceOrders_RealtyServices_RealtyServiceId",
                        column: x => x.RealtyServiceId,
                        principalTable: "RealtyServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RealtyServiceRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RealtyServiceId = table.Column<int>(type: "INTEGER", nullable: false),
                    RealtyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealtyServiceRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealtyServiceRequests_Realties_RealtyId",
                        column: x => x.RealtyId,
                        principalTable: "Realties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RealtyServiceRequests_RealtyServices_RealtyServiceId",
                        column: x => x.RealtyServiceId,
                        principalTable: "RealtyServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RealtyServicePayments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Payment = table.Column<int>(type: "INTEGER", nullable: false),
                    PaymentState = table.Column<int>(type: "INTEGER", nullable: false),
                    DueDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PeriodStart = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PeriodEnd = table.Column<DateTime>(type: "TEXT", nullable: false),
                    RealtyServiceOrderId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealtyServicePayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealtyServicePayments_RealtyServiceOrders_RealtyServiceOrderId",
                        column: x => x.RealtyServiceOrderId,
                        principalTable: "RealtyServiceOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HouseRealtyService_ScopeId",
                table: "HouseRealtyService",
                column: "ScopeId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServiceOrders_RealtyId",
                table: "RealtyServiceOrders",
                column: "RealtyId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServiceOrders_RealtyServiceId",
                table: "RealtyServiceOrders",
                column: "RealtyServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServicePayments_RealtyServiceOrderId",
                table: "RealtyServicePayments",
                column: "RealtyServiceOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServiceRequests_RealtyId",
                table: "RealtyServiceRequests",
                column: "RealtyId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServiceRequests_RealtyServiceId",
                table: "RealtyServiceRequests",
                column: "RealtyServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServices_ProviderId",
                table: "RealtyServices",
                column: "ProviderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HouseRealtyService");

            migrationBuilder.DropTable(
                name: "RealtyServicePayments");

            migrationBuilder.DropTable(
                name: "RealtyServiceRequests");

            migrationBuilder.DropTable(
                name: "RealtyServiceOrders");

            migrationBuilder.DropTable(
                name: "RealtyServices");
        }
    }
}
