﻿// <auto-generated />
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MedicalPlant.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Removed")
                        .HasColumnType("boolean");

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
#pragma warning restore 612, 618
        }
    }
}
