using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicalPlant.Migrations
{
    public partial class Update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlantContraindicationEntryData_PlantData_PlantId",
                table: "PlantContraindicationEntryData");

            migrationBuilder.DropIndex(
                name: "IX_PlantContraindicationEntryData_PlantId",
                table: "PlantContraindicationEntryData");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PlantContraindicationEntryData_PlantId",
                table: "PlantContraindicationEntryData",
                column: "PlantId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlantContraindicationEntryData_PlantData_PlantId",
                table: "PlantContraindicationEntryData",
                column: "PlantId",
                principalTable: "PlantData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
