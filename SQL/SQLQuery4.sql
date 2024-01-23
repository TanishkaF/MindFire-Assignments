USE [STUDENT]
GO
/****** Object:  Trigger [dbo].[T1]    Script Date: 23-01-2024 12:31:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[T2]
ON [dbo].[student]
AFTER DELETE
AS
BEGIN
    INSERT INTO backUpTable (roll_no, FirstName, Class, section)
    SELECT roll_no, FirstName, Class, section
    FROM deleted;
END;