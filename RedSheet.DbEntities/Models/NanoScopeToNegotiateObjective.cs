
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Rx.Core.Data.Attributes;
using RedSheet.DbEntities.Enums;

namespace RedSheet.DbEntities.Models
{
    [Table("NanoScopeToNegotiateObjectives", Schema = "dbo")]
    [Serializable]
    public partial class NanoScopeToNegotiateObjective
    {

        [Required]
        [MaxLength(100)]
        public string Buy { get; set; }

        [Required]
        public System.DateTime Date { get; set; }

        [Required]
        [MaxLength(200)]
        public string Focus { get; set; }

        [Required]
        [MaxLength(500)]
        public string KnowAboutThem { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int NanoScopeToNegotiateObjectiveId { get; set; }

        [Required]
        [MaxLength(100)]
        public string OpponentName { get; set; }

        [Required]
        [MaxLength(200)]
        public string Reason { get; set; }

        [RelationshipTableAttribue("NanoRelationshipRequires", "dbo")]
        //Relationships
        public int NanoRelationshipRequireId { get; set; }

        [ForeignKey("NanoRelationshipRequireId")]
        public NanoRelationshipRequire NanoRelationshipRequire { get; set; }

        [RelationshipTableAttribue("NanoScopeToNegotiates", "dbo")]
        //Relationships
        public int NanoScopeToNegotiateId { get; set; }

        [ForeignKey("NanoScopeToNegotiateId")]
        public NanoScopeToNegotiate NanoScopeToNegotiate { get; set; }

        [RelationshipTableAttribue("ProjectModules", "dbo")]
        //Relationships
        public int ProjectModuleId { get; set; }

        [ForeignKey("ProjectModuleId")]
        public ProjectModule ProjectModule { get; set; }

        [RelationshipTableAttribue("ValueObjectives", "dbo")]
        //Relationships
        public int ValueObjectiveId { get; set; }

        [ForeignKey("ValueObjectiveId")]
        public ValueObjective ValueObjective { get; set; }
        [InverseProperty("NanoScopeToNegotiateObjective")]
        public ICollection<NanoOurObjective> NanoOurObjectives { get; set; }

        [InverseProperty("NanoScopeToNegotiateObjective")]
        public ICollection<NanoScopeToNegotiateCommunicationMode> NanoScopeToNegotiateCommunicationModes { get; set; }


        public NanoScopeToNegotiateObjective()
        {
            this.NanoOurObjectives = new HashSet<NanoOurObjective>();

            this.NanoScopeToNegotiateCommunicationModes = new HashSet<NanoScopeToNegotiateCommunicationMode>();

        }

    }
}

