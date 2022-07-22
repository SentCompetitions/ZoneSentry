using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class PurchaseRequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SellCost",
                table: "Realties",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PurchaseRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SellCost = table.Column<int>(type: "INTEGER", nullable: false),
                    RealtyId = table.Column<int>(type: "INTEGER", nullable: false),
                    NewOwnerId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseRequests_AspNetUsers_NewOwnerId",
                        column: x => x.NewOwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseRequests_Realties_RealtyId",
                        column: x => x.RealtyId,
                        principalTable: "Realties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseRequests_NewOwnerId",
                table: "PurchaseRequests",
                column: "NewOwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseRequests_RealtyId",
                table: "PurchaseRequests",
                column: "RealtyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseRequests");

            migrationBuilder.DropColumn(
                name: "SellCost",
                table: "Realties");
        }
    }
}
