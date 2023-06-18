using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicalPlant.Migrations
{
    public partial class Update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "PlantData",
                newName: "LatinName");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "PlantData",
                newName: "CommonName");

            migrationBuilder.AddColumn<string>(
                name: "ArabicName",
                table: "PlantData",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OriginId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlantClassId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlantDivisionId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlantFamilyId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlantGenreId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlantSpeciesId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsedPartId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VegetableReignId",
                table: "PlantData",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArabicName",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "OriginId",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "PlantClassId",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "PlantDivisionId",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "PlantFamilyId",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "PlantGenreId",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "PlantSpeciesId",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "UsedPartId",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "VegetableReignId",
                table: "PlantData");

            migrationBuilder.RenameColumn(
                name: "LatinName",
                table: "PlantData",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CommonName",
                table: "PlantData",
                newName: "Description");
        }
    }
}
