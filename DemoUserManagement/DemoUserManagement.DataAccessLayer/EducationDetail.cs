//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DemoUserManagement.DataAccessLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class EducationDetail
    {
        public int EducationID { get; set; }
        public Nullable<int> StudentID { get; set; }
        public Nullable<int> EducationType { get; set; }
        public string InstituteName { get; set; }
        public string Board { get; set; }
        public string Marks { get; set; }
        public Nullable<decimal> Aggregate { get; set; }
        public Nullable<int> YearOfCompletion { get; set; }
    
        public virtual StudentDetail StudentDetail { get; set; }
    }
}
