using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class BookConfiguration:IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        // ID
        builder.HasKey(x => x.Id);

        // Title
        builder.Property(b => b.Title)
            .IsRequired()
            .HasMaxLength(200);
        
        //Author
        builder.Property(b => b.Author)
            .IsRequired()
            .HasMaxLength(200);
        
        //ImageUrl
        builder.Property(b => b.ImageUrl)
            .HasMaxLength(500);
        
        //IsAvailable
        builder.Property(b => b.IsAvailable)
            .IsRequired();
        
        // Genre
        builder.Property(b => b.Genre)
            .IsRequired();
        
        // Common Fields

        // // CreatedOn
        // builder.Property(x => x.CreatedOn).IsRequired();
        //
        // // ModifiedOn
        // builder.Property(x => x.ModifiedOn).IsRequired();

        // Relationships 
        builder.HasMany(x => x.Loans)
            .WithOne(x => x.Book)
            .HasForeignKey(x => x.BookId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.ToTable("Books");
    }
}