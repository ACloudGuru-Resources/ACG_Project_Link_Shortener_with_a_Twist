CREATE TABLE Links (
    Id uniqueidentifier PRIMARY KEY,
    ShortenedPath nvarchar(255),
    RedirectUrl nvarchar(4000),
    CreatedAt datetimeoffset,
    CreatedBy nvarchar(255)
);

CREATE INDEX Links_ShortenedPath ON Links (ShortenedPath);

--

INSERT INTO Links (Id, ShortenedPath, RedirectURl, CreatedAt, CreatedBy)
VALUES (newid(), 'google', 'https://google.com.au/', sysdatetimeoffset(), 'rob');