using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class LoanConfiguration:IEntityTypeConfiguration<Loan> 
{
    public void Configure(EntityTypeBuilder<Loan> builder)
    {
        // ID
        builder.HasKey(x => x.Id);
        
        //BookId
        builder.Property(l => l.BookId)
            .IsRequired();
        
        //LoanedOutTo
        builder.Property(l => l.LoanedOutTo)
            .IsRequired()
            .HasMaxLength(200);
        
        //LoanDate
        builder.Property(l => l.LoanDate)
            .IsRequired();
        
        //DueDate
        builder.Property(l => l.DueDate)
            .IsRequired();
        
        //ReturnDate
        builder.Property(l => l.ReturnedDate)
            .IsRequired(false);

        // Common Fields

        // CreatedOn
        // builder.Property(x => x.CreatedOn).IsRequired(false);
        
        // ModifiedOn
        // builder.Property(x => x.ModifiedOn).IsRequired(false);
        
        // Relationships
        builder.HasOne(x => x.Book)
            .WithMany(x => x.Loans)
            .HasForeignKey(x => x.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable("Loans");
    }
}