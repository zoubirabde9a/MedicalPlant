﻿// <auto-generated />
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MedicalPlant.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230618112450_Update4")]
    partial class Update4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Model.Plant", b =>
                {
                    b.Property<long>("PlantId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("PlantId"));

                    b.Property<string>("ArabicName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CommonName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LatinName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("OriginId")
                        .HasColumnType("integer");

                    b.Property<int>("PlantClassId")
                        .HasColumnType("integer");

                    b.Property<int>("PlantDivisionId")
                        .HasColumnType("integer");

                    b.Property<int>("PlantFamilyId")
                        .HasColumnType("integer");

                    b.Property<int>("PlantGenreId")
                        .HasColumnType("integer");

                    b.Property<int>("PlantSpeciesId")
                        .HasColumnType("integer");

                    b.Property<bool>("Removed")
                        .HasColumnType("boolean");

                    b.Property<int>("UsedPartId")
                        .HasColumnType("integer");

                    b.Property<int>("VegetableReignId")
                        .HasColumnType("integer");

                    b.HasKey("PlantId");

                    b.ToTable("PlantData");
                });

            modelBuilder.Entity("Model.PlantContraindication", b =>
                {
                    b.Property<long>("PlantContraindicationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("PlantContraindicationId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Removed")
                        .HasColumnType("boolean");

                    b.HasKey("PlantContraindicationId");

                    b.ToTable("PlantContraindicationData");
                });

            modelBuilder.Entity("Model.PlantContraindicationEntry", b =>
                {
                    b.Property<long>("PlantContraindicationEntryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("PlantContraindicationEntryId"));

                    b.Property<long>("PlantContraindicationId")
                        .HasColumnType("bigint");

                    b.Property<long>("PlantId")
                        .HasColumnType("bigint");

                    b.HasKey("PlantContraindicationEntryId");

                    b.ToTable("PlantContraindicationEntryData");
                });

            modelBuilder.Entity("Model.PlantOrigin", b =>
                {
                    b.Property<long>("PlantOriginId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("PlantOriginId"));

                    b.Property<string>("LatinName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Removed")
                        .HasColumnType("boolean");

                    b.HasKey("PlantOriginId");

                    b.ToTable("PlantOriginData");
                });
#pragma warning restore 612, 618
        }
    }
}
