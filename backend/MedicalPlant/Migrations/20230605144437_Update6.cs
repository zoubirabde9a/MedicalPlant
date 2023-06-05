﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicalPlant.Migrations
{
    public partial class Update6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Test",
                table: "PlantData");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Test",
                table: "PlantData",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
