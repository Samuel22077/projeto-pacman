// ================================================================
//  pacman.js — Lógica completa do jogo PAC-MAN
// ================================================================


// ── referências aos elementos do HTML ───────────────────────────
const tela    = document.getElementById("tela");
const ctx     = tela.getContext("2d");
const sPontos = document.getElementById("sPontos");
const sVidas  = document.getElementById("sVidas");
const sNivel  = document.getElementById("sNivel");
const overlay = document.getElementById("overlay");
const oH2     = overlay.querySelector("h2");
const btnJogar= document.getElementById("btnJogar");


// ── sprites dos personagens ──────────────────────────────────────
// base64 = imagem convertida em texto, o browser lê direto
const S_PAC = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAACADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAMHCAEG/8QAKRAAAgICAQMDBAIDAAAAAAAAAQIDBAARBRITMQYHISJBUWEVgSQykf/EABcBAQEBAQAAAAAAAAAAAAAAAAIDBAX/xAAnEQACAAUEAgEFAQAAAAAAAAABAgADBAURITFBURJh0XGRofDxwf/aAAwDAQACEQMRAD8AxljIIZZ5VigieWRvCIpYn+hnacD2rcNaMqHmkWNS3gEnQ3mnvSns7fqQ8bFG9Zqc38VI6r30eRb7lY9y9hlB+khpNMinSjqYdGdq0Wla4s01/BBzuSeh88aRjq6oyAAq5JjMNmtYqyCOzBLA5GwsiFSR+dHFZ771t6hirM/FR1orLEDviYHpAI2ANEHfg738fH38eByV4oZFDUGTJmeeN9MYPXR/RCpJ7z5Yd1xmGV5ZIJ454m6ZI2Dodb0Qdg5dPS3ujythI5qfKV4rbPSftS14XkSSkgWuydS7HQo11LrqBIbe2GQfDKWi8PbWbKB1bcH111/OhBq6MVAGuCORFA9ccdw8v+XYupTtKu2CgM8q+B9GwSd/G/8AvwPif4YZK7XFLhPM5ZQTO+DnPs8fYD3CpKdqeX4FswYyCGWeVYoInlkbwiKWJ/oZ2nA9q3DWjKh5pFjUt4BJ0N5p70p7O36kPGxRvWanN/FSOq99HkW+5WPcvYZQfpIaTTIp0o6mHRlrRaVrizTX8EHO5J6HzxpBq6oyAAq5JjMNmtYqyCOzBLA5GwsiFSR+dHFZW+QucPKs9C/aqgf6yRSyBT8gEedfkHY+/wCxkkyl9s6Wx1EuYHBz9QRuD+96QaGsapU+S4x+cwyvLJBPHPE3TJGwdDreiDsHLp6W90eVsJHNT5SvFbZ6T9qWvC8iSUkC12TqXY6FGupddQJDb2wyD4ZK0Xh7azZQOrbg+uuv50IVXRioA1wRyIrnJclxvFRyyWJoo5CO4Y1I7kn2BA8nwBv9frJHhhlL5fHuzKSgULnA333ydOuoNFRLSg4OSf8AI//Z";
// sprite do fantasma assustado (azul) e piscando (branco)
const S_ASST   = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAwUHCAQG/8QAKRAAAgIBAwMEAQUBAAAAAAAAAQIDBAUAERIGITEHExQVIjNBUdHh8P/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBAX/xAAmEQACAQMCBAcAAAAAAAAAAAABAhEAAwQFEhMhQcEUImFxgdHw/9oADAMBAAIRAxEAPwDGWj0Klq/er0aNaa1bsyrDBBDGXkldjsqKo7sxJAAHck6Br3fo7gs/1B1NSodI15Xz7zF6bRWVhkDxKZeSuxUIVC8geW+4/nbVun4fjL3DLBRBJJ9P3WKC4+wTFJ7vSWRxOYu4rOJ8S5RsSVrMCurlJEYqy8lJU7EeQSDoXWWGn6dyBwt/G2cfkYeJsQW4njmj3UFeStsV3DcvHcEHxtq8UfVL1vo4XI+odXPsmPyWRjx9u58amRJajg3VREU3UiMD8lUA7DckjWeupLs2Rzlu7ZeWW1NM72JpZC7zSFiWdie5YnuSfJ763tTxLeBh7VRdx5TJYz16AD6NJRt78iY9o7ml2qn6YZDpnCYyjklv9WY/ORGSdreLnjh3O7J8dDvyj5ptvY3bjyK+w4HJpZptjsslaCGBomKKG5EedySRt/3+5+g38ezklr7QCI+SR2mjvqzL5arH2/RMuH+r93renjHse59X8+GxBDMV4/N5cI1kcL+Ps+2hYD9dd+Ij2dWsmbvpSlmmrLZkEMksQjd05HiWQMwUkbbgM23jc+ddqZ1xD+cKmXl+3ZeP96U2pBLZllUEB3LDfz3OrdezsXJtILDE85INLsIyk7hX/9k=";
const S_BRANCO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACADASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAACAIGCQf/xAApEAACAQQBBAEEAgMAAAAAAAABAgMEBQYREgAHCBMVFCEjMSIzQUNR/8QAGAEAAgMAAAAAAAAAAAAAAAAAAgQAAQP/xAAmEQABBAECBAcAAAAAAAAAAAABAAIDESESMQRBYfATIlFxgbHh/9oADAMBAAIRAxEAPwAZdSjR5JFjjRndiAqqNkk/oAdR6avgxFhNk7N5Rm2QWakp4xVG13C51DtVPPG3AmEQCL8cP5YQQC5kYsW0qIBTjQJWkTDI9rACSTVDc+3VVPsZ4g3PJ7XQ5Hnt7+JtdZAs8FDbmWSrkjdW4lpCDHF/rcACQlWIPBh1WfLCzdoMLtGP4j2wFpuFbLqpvNxSresqfxpwhBl5GNPZ7JneNAuykRIUBNrtu1fZhsiTEWsbG5R0ZuKUn1tZpYS4jMgbnx2WAGt7+w+2ugf5Q3LHrh3ryCHHcTpMaht1VNbqiGlk3HUzQTSRmoCBVWLmoTaKNbBJJLEkGlxOa/eff0muLi4aMDwi6znzNAxy2Ju/gDquY9aAeHmNXCXxttaUdqxqpt95qamWsguKSzeyVZ2jFSwO0biIY1FOFUN6w/tUsQM/+lN2C8pbV25wzFMKuGN1tXaaCmrPkquBlNR75KmSWL0oWCsgVgG5FSS+xoR6kJzdQpLQymJ2oDKYfxmXR3T5H1YhVXBIOHyP0UsE0sQbl9Jrk5RS38vb7HAJ/pbWzmL3raobvLmzVcUUVQchrzKkUhdFf6iTYViFLAH9Egb/AOD9dJC0ebV1ixAtd8ToqvJfkk0lKGgohQgIX/k0jv7iRIo+3EclY8uJRjB3KvdLkvcXJcjoY5o6S63eqrYEmAEipLMzqGAJAbTDeiRv/J6jW6dkU05lA1AY9O6X/9k=";
// sprite da cereja bônus
const S_CEREJA = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmUAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACADASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYEBwj/xAAiEAACAQUAAgIDAAAAAAAAAAABAgMABAUREgYhBxQVIoH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgQDBf/EACIRAAEDAwUAAwAAAAAAAAAAAAECAxEABAUSISIxQRRRkf/aAAwDAQACEQMRAD8A8ZUpWjHWN7kbyOyx9pcXlzJviGCMyO2gSdKPZ0AT/KBIAk0QCTArPSqPybxR/H8NYXV7mMXJkLpyWx1vcLNJDFyrJIzISmmDbA37BUjrbczlK24lxOpJkUzjamzpUINK7PHF4BJ+GxNpf417LJSW/wBt06glUAhmhnK9OY9pv9QxbpCQJAFTjFKnurX5EciI+q7WGzScaHELZS4lcA6h4J6MGJn9g+VbfL2OgsM8hDxm7ftJ0inWSNQhCrxySoTQKryeOVAX0KiaUrW3aLLYQTMe1Hlr5u/vF3DTQbCo4jobAGNh2d+va//Z";
// sprite dos olhos do fantasma comido (spritesheet 32x64: 2 frames animados)
const S_OLHOS  = "data:image/png;base64,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";
const S_F1 = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABwgDBAYF/8QAJBAAAgICAQUBAAMBAAAAAAAAAQIDBAURIQAGBxITMRQiUUH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFBAMG/8QAJxEAAQQABQMEAwAAAAAAAAAAAQIDBBEABSExQQYSEyJhscFRgfD/2gAMAwEAAhEDEQA/AEy6kqwT2rMVatDJPPM4jiijUszsToKAOSSeNDqPou+Esfjkws+Zna5VsLO0aWK8P1c/MI7aLMgQD3ThWZidkhQF3i+txCLbT3K4AwhlkNqXIDbzobTyogn4+6HweBi/G15LMkefl/htE7I9eJldwwJBBYbUcgHj22P86peSMXjO3pIMLUqfG6unt/YN9l0v9N74X2DFiABv+p/NdMvir16fL26UPdGbRi7yPvB/RCyFY2YRKzMhICgkou/UA8gDpW/JssEnfWXSGF0aC3LDLI4ZWndZGBlZWG1ZtAlTzve+d9EQ1zHZVPigEg1tqQDt+NdDrYo6bY7DOG8rg5X44aUFaj2lXqUrQ0qiUgJIIogVyN8ZvpgvC+RpY/xU1exiILP1uGVZ/RGkidyVYj6xyIAVgQa0P+nn9C+9FDsPv/tvDYTGYHK43LS0vWSTIz1pI/qJg8hi+SsNFAr6b2IJLbGgmntzJtxxoBsWb+j/AFc4C6YlQo0pSphpJTXO/cm9tR6bF4PGJ79qxSSyUu2KseRavIXusy/SVgpcs/ziXeyuzrQ3/g/FN7ysTW+78zbsP7zTX55JG0BtjIxJ0OP09b3BeUaFHBvNcxdmznGstH6xOsVUVGT1fk+z/XlwOPUbVjvRVh33HZp3O4clbx4nFOe3LJXE+voI2clfbXHtojeuN9TZbGdZcV5E/vCfVWY5ZLbQIPFWDfvyb9sf/9k=";
const S_F2 = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAgcIBQb/xAAoEAACAQMEAQMEAwAAAAAAAAABAgMEBREABgcSExQhMQgiMlEVQUL/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EACQRAAEEAgICAQUAAAAAAAAAAAECAwQRACEFQTGRExRRgaLh/9oADAMBAAIRAxEAPwCMtFGjySLHGrO7EBVUZJJ/oaHT1+nqbb9u2xXXCutM7VE8klPJUoomMiIFZ0w/RUTDp7BnLHJbACaPKddabtpsrV0Bi4UdMh0IWoJHZOZmweEay500Fx3LXeipZUDpTUxDTMpBwSxyqf5Pt2yCQep1k8z2/Ze36S3WPaq0k9S2Ja+pErTTDqvVAWz1Xt2dmVQPhDgDGnvR27Ztwn/hPSXvw0jzSRoaad0DdlSRhGjs6k9UyWUfiAfcAamrmCrtlXyBdFtVoS2R008lNIqgr5njdl8pQgeMsAuVx7EHOSTqHE+senBT5UEgA0QEjYsaCiSN2D3o5f5ONDiQ6j0SSRZ2dGjvxYIojVbHnOR1UPA9NajxRbKCW3RNNXPVVZqSkUjxusyxnqJVdRlUjBwuPt/ZB1L2nBxpytY9tUG3rXcLVcZqWipKuOsmgdO/kln8ieND7FQFUHLAkucfj97uYZfdZAYFkG/1PvdayZwz7TD5U6qhVX+R61e+spFLnQWlPWQWimNbIUhlq+saSys7qCzlVXJLEMQMZPwPjUW8ju0nIe5JHOWa7VTE/smZtM6LnQTbYCXSzee8i4xSBaY+Gm9MjI592Lt5CVZfjADA++OpU27q+muu7LxdKJZlpqyunqIVlADhHkZlDYJGcEZwdD4SJLYUoyRv7+v7jObnMSm0fEq66z//2Q==";
const S_F3 = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABgcIAQT/xAAoEAACAQMEAQQBBQAAAAAAAAABAgMEBREABhIhEwcUMUEiIzJRYYH/xAAYAQEAAwEAAAAAAAAAAAAAAAAEAAIDBf/EACgRAAECBQEHBQAAAAAAAAAAAAECEQADBBIhMQUTQVFhocEUcYGR0f/aAAwDAQACEQMRAD8AjLWorOwVVLMTgADJJ1mmv6OWi1T2CquVaKmFmleHyRU4mLhFVnB5MiqoDp0rMSc8go45sgJKgFdgSfoQimkb9dpUE9TpA5t/Yk9TGlRdJ/BEwyIoiC5HfyfgfR+/81x73prLbYqa32pYnlP51EnMu/QwvecDOWJAx8D+tPml2jZblItgN3vft6J55IYzaZHRW5KkjCNJC6k8UyWUftAOMAan71EWki3lc6SjpvClJUyUzHgUMpR2XmUIBQkAZX6Pz3nSZs6jtskk3YOUkYOQc8wx4Y5x06umFNT4Cc4cFy4woaMGII/DiB/T49HL5QWv04W2VNmgqmqKiSpjqP0jLExYI+BKki4Kxxjpf5yckaQ+mLsnd+1LXDZqK70F6kp4aeoWvmpZYg4laUtH4kYYKhQA3JgSWJGOOHMEyFOJ6bk+eEF2ZPEmaVFTdfkP2eHlaPVCmgglqodoUtNcXVonq2nj8kr/AG0hWNOWXGSBjJ+PrUu7wqZqzdt4q6l+c09fPJI2AOTNIxJwOh2dGVHv+1HbeLlba2e9e/RgtPIsVN7VSrHtg7eQkMB1xGQe8FSD7iqKOr3Bcaq3icUc1XLJTifHkEZcleeOuWCM46zqKlUct/TS7SSX1OMNqT1jfaVZv0JF9zN7vl/Ef//Z";
const S_F4 = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABgcIAwX/xAAmEAACAgIBBAMAAgMAAAAAAAABAgMEBRESAAYTIQcxQRQiMmFx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgMF/8QAJhEBAAEDAwMDBQAAAAAAAAAAAQIDBBEAEiExQVEFFLFCcYGRof/aAAwDAQACEQMRAD8AjLrSvDLYnjr14nlmlYJHGilmdidAAD2ST+dZ9Mz4m7eqXMTNmbF25ReOdkilrVvK+4wjMds8YXXNNcWZt7JC/wBd2oQpzqEaktp9lfwAunTpyqOI/If1waFou1bUFqWDKH+PJC7RyRIwZgwJBGxsfY/N9Yd10IcTMmNFZoLS6adZVYSL6/rsH62DvX/P9dUnjamVtZKxjo++M2vB5JCD26JELKVjZhGrsyE6QElV/wAQD7AHU2d+IsPeOWrK0kjV7k0LzSKyPMyyMDIyt7Vm1sg+wfv31qXF16dG3aNtzPhVJZw8iZiHJjp2dXubGdAJucKn09ThOJPI5HphNcPp0/EndFbCfGtqnawde8rXhLFPqPywvICG0ZY5E0VgQa4j9+/xLdH/AGf3R2jQxmPw+Zo5x6jq8uSmqTRCQTK0ni8KsuinB9NyIJLbGgmnz7X2bJLyG6OOh5yPZHs/Ghb1KtOe6lPa+dP238nYvFZJ4cL29UsX5Mc075JwEeRjEZdyKkSluWlY6Kj3+a9Sn3JbsZDuLJX7cnksWbcs0r8QOTs5JOh6Hsn66LMD3jhKGDea5j8jZzjWGi4xSpFVFR04v7IZ/L7cD1xG1Y74lWEM7LSmzd+bGiwKMlmRq38jXl8ZYlefH1y1revW+nc0vTKUdtjBHuuef2uq3d5cXWJVZ58HjX//2Q==";

// função que cria um objeto Image com o src já definido
function img(src) { const i = new Image(); i.src = src; return i; }

/*
  removerFundo: processa uma imagem num canvas auxiliar e torna transparentes
  todos os pixels escuros (fundo preto das sprites pixel art).
  Tolerância 60 = pixels com R,G,B menores que 60 viram transparentes.
*/
function removerFundo(imgOriginal, tolerancia) {
  const resultado = new Image();

  function processar() {
    const aux  = document.createElement("canvas");
    aux.width  = imgOriginal.naturalWidth;
    aux.height = imgOriginal.naturalHeight;
    const cx2  = aux.getContext("2d");
    cx2.drawImage(imgOriginal, 0, 0);
    const dados = cx2.getImageData(0, 0, aux.width, aux.height);
    const px    = dados.data;
    for (let i = 0; i < px.length; i += 4) {
      if (px[i] < tolerancia && px[i+1] < tolerancia && px[i+2] < tolerancia) {
        px[i+3] = 0; // torna o pixel transparente
      }
    }
    cx2.putImageData(dados, 0, 0);
    resultado.src = aux.toDataURL();
  }

  if (imgOriginal.complete && imgOriginal.naturalWidth > 0) processar();
  else imgOriginal.addEventListener("load", processar);

  return resultado;
}

const spritePac      = img(S_PAC);
const spriteFantasma = [ img(S_F1), img(S_F2), img(S_F3), img(S_F4) ];
const spriteAsst     = img(S_ASST);
const spriteBrnco    = img(S_BRANCO);
const spriteCereja   = img(S_CEREJA);
const spriteOlhos    = img(S_OLHOS);   // olhos do fantasma comido (spritesheet 32x64)

// versões sem fundo preto — criadas assim que as imagens carregam
let pacSF, fantasmasSF, asstSF, brncoSF, cerejaSF, olhosSF;
let spritesProcessadas = false;

function garantirSprites() {
  if (spritesProcessadas) return;
  spritesProcessadas = true;
  pacSF        = removerFundo(spritePac, 60);
  asstSF       = removerFundo(spriteAsst, 60);
  brncoSF      = removerFundo(spriteBrnco, 60);
  cerejaSF     = removerFundo(spriteCereja, 60);
  olhosSF      = removerFundo(spriteOlhos, 60);
  fantasmasSF  = spriteFantasma.map(s => removerFundo(s, 60));
}

// chama ao iniciar o jogo para garantir que sprites sejam processadas
// (o jogo já aguarda o clique do jogador, então as imagens já carregaram)


// ── constantes do jogo ───────────────────────────────────────────
const T    = 32;           // tamanho de cada célula em pixels (maior para sprites visíveis)
const COLS = 20;           // colunas do mapa
const LINS = 22;           // linhas do mapa
const VEL_PAC        = 0.9;    // velocidade do pac-man
const VEL_F          = 0.7;    // velocidade dos fantasmas
const VEL_ASST       = 0.45;   // velocidade dos fantasmas assustados
const DIST_PERSEGUIR = 6 * T;  // distância para começar a perseguir


// ── mapa do labirinto ────────────────────────────────────────────
/*
  0 = bolinha normal     1 = parede
  2 = bolinha nos corredores do spawn
  3 = power-up           4 = casa dos fantasmas
*/
const MAPA0 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 3, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 1, 1],  // linha 8: corredor livre
  [1, 1, 1, 1, 0, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 0, 1, 1, 1, 1],  // linha 9: saída aberta cols 9-10
  [2, 2, 2, 2, 0, 2, 2, 1, 4, 4, 4, 4, 1, 2, 2, 0, 2, 2, 2, 2],
  [1, 1, 1, 1, 0, 1, 2, 1, 4, 4, 4, 4, 1, 2, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 2, 1, 4, 4, 4, 4, 1, 2, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 3, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 0, 3, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// conta bolinhas totais (0, 2 e 3 são coletáveis)
let totalBolinhas = 0;
MAPA0.forEach(l => l.forEach(v => { if (v === 0 || v === 2 || v === 3) totalBolinhas++; }));


// ── estado global ────────────────────────────────────────────────
let mapa, pontos, vidas, nivel, comidas, rodando, pausado, raf, timerPower;
let pac, fantasmas;
let cereja     = { visivel: false, col: 9, lin: 13, timer: 0, espera: 60 };
// timer: quanto tempo fica visível | espera: quanto tempo fica escondida antes de reaparecer
let animCereja = null;
let timerJogo  = 0;   // conta frames desde o início — controla o aparecimento da cereja


// ── funções auxiliares ───────────────────────────────────────────
function px(col) { return col * T + T / 2; }
function py(lin) { return lin * T + T / 2; }
function colDe(x) { return Math.floor(x / T); }
function linDe(y) { return Math.floor(y / T); }

function tipo(col, lin) {
  if (col < 0 || col >= COLS || lin < 0 || lin >= LINS) return 1;
  return mapa[lin][col];
}

function livreParaPac(col, lin) {
  const t = tipo(col, lin);
  return t !== 1 && t !== 4;
}

// fantasmas vivos não entram na casa (tipo 4) — só quem está no modo "comido" pode
function livreParaF(col, lin, modo) {
  const t = tipo(col, lin);
  if (t === 1) return false;
  if (t === 4 && modo !== "comido") return false;
  return true;
}


// ── criar pac-man ────────────────────────────────────────────────
function criarPac() {
  return {
    col: 1, lin: 20,
    x: px(1), y: py(20),
    dx: 0, dy: 0,
    ndx: 0, ndy: 0,
    passo: 0,
    ang: 0,
    framePac: 0,    // 0 = boca aberta, 1 = boca fechada
    timerFrame: 0   // conta frames para trocar a animação
  };
}


// ── criar fantasmas ──────────────────────────────────────────────
function criarFantasmas() {
  // 60fps × 5 segundos = 300 frames de diferença entre cada fantasma
  const reducao = (nivel - 1) * 60;
  const t1 = Math.max(30,  60  - reducao);   // sai em ~1s
  const t2 = Math.max(30,  360 - reducao);   // sai em ~6s  (+5s)
  const t3 = Math.max(30,  660 - reducao);   // sai em ~11s (+5s)
  const t4 = Math.max(30,  960 - reducao);   // sai em ~16s (+5s)

  return [
    { spr: spriteFantasma[0], col: 9,  lin: 10, dx: 0, dy: -1, modo: "casa", saidaTimer: t1 },
    { spr: spriteFantasma[1], col: 9,  lin: 11, dx: 0, dy: -1, modo: "casa", saidaTimer: t2 },
    { spr: spriteFantasma[2], col: 10, lin: 11, dx: 0, dy: -1, modo: "casa", saidaTimer: t3 },
    { spr: spriteFantasma[3], col: 8,  lin: 11, dx: 0, dy: -1, modo: "casa", saidaTimer: t4 },
  ].map(f => ({ ...f, x: px(f.col), y: py(f.lin), t: 0, dCol: f.col, dLin: f.lin, frameOlhos: 0, timerOlhos: 0 }));
}


// ── iniciar jogo ─────────────────────────────────────────────────
function iniciarJogo() {
  garantirSprites();
  mapa       = MAPA0.map(l => [...l]);
  pontos     = 0; vidas = 3; nivel = 1; comidas = 0; timerPower = 0;
  rodando    = true; pausado = false;
  pac        = criarPac();
  fantasmas  = criarFantasmas();
  cereja     = { visivel: false, col: 9, lin: 13, timer: 0, espera: 300 };
  timerJogo  = 0;
  atualizarHUD();
  overlay.hidden = true;
  if (raf) cancelAnimationFrame(raf);
  loop();
}

function loop() {
  if (!rodando) return;
  if (!pausado) atualizar();
  desenhar();
  raf = requestAnimationFrame(loop);
}


// ================================================================
//  LÓGICA
// ================================================================

function atualizar() {
  timerJogo++;
  moverPac();
  comer();
  atualizarCereja();
  if (animCereja) { animCereja.timer--; if (animCereja.timer <= 0) animCereja = null; }
  moverFantasmas();
  colisao();
  if (timerPower > 0) timerPower--;
}


// ── pac-man ──────────────────────────────────────────────────────
function moverPac() {
  const p = pac;

  p.passo += VEL_PAC;
  p.x += p.dx * VEL_PAC;
  p.y += p.dy * VEL_PAC;

  // troca o frame da boca a cada 6 pixels andados (abre/fecha enquanto move)
  if (p.dx !== 0 || p.dy !== 0) {
    p.timerFrame++;
    if (p.timerFrame >= 8) { p.timerFrame = 0; p.framePac = p.framePac === 0 ? 1 : 0; }
  } else {
    p.framePac = 0; // parado: boca aberta
  }

  if (p.passo < T) return;

  // chegou ao centro da célula: snap e tenta nova direção
  const c = p.col + p.dx;
  const l = p.lin + p.dy;
  if (livreParaPac(c, l)) { p.col = c; p.lin = l; }
  p.x = px(p.col); p.y = py(p.lin); p.passo = 0;

  // portal esquerda ↔ direita
  if (p.col < 0)    { p.col = COLS - 1; p.x = px(p.col); }
  if (p.col >= COLS){ p.col = 0;        p.x = px(p.col); }

  // aplica a direção pedida pelo jogador
  if (p.ndx !== 0 || p.ndy !== 0) {
    if (livreParaPac(p.col + p.ndx, p.lin + p.ndy)) {
      p.dx = p.ndx; p.dy = p.ndy;
      // atualiza o ângulo para rotacionar o sprite corretamente
      if      (p.dx >  0) p.ang = 0;
      else if (p.dx <  0) p.ang = Math.PI;
      else if (p.dy <  0) p.ang = -Math.PI / 2;
      else                p.ang =  Math.PI / 2;
    }
  }

  if (!livreParaPac(p.col + p.dx, p.lin + p.dy)) { p.dx = 0; p.dy = 0; }
}


// ── comer bolinhas ───────────────────────────────────────────────
function comer() {
  const c = colDe(pac.x), l = linDe(pac.y);
  if (l < 0 || l >= LINS || c < 0 || c >= COLS) return;
  const v = mapa[l][c];

  if (v === 0 || v === 2) {
    mapa[l][c] = 9; pontos += 10; comidas++; atualizarHUD();
  } else if (v === 3) {
    mapa[l][c] = 9; pontos += 50; comidas++;
    // modo vulnerável dura 18s no nível 1, reduz 1s por nível, mínimo 15s
    timerPower = Math.max(900, 1080 - (nivel - 1) * 60);
    fantasmas.forEach(f => {
      if (f.modo === "aleatorio" || f.modo === "perseguir") f.modo = "assustado";
    });
    atualizarHUD();
  }

  if (cereja.visivel && c === cereja.col && l === cereja.lin) {
    cereja.visivel = false;
    cereja.espera  = 1500;   // 25 segundos até reaparecer
    pontos += 500; atualizarHUD();
    animCereja = { x: px(cereja.col), y: py(cereja.lin), timer: 90 };
  }

  if (comidas >= totalBolinhas) proximoNivel();
}

/*
  Lógica da cereja:
  - Começa escondida com um timer de espera de 5s (300 frames)
  - Quando a espera zera: sorteia uma célula livre e aparece por 15s (900 frames)
  - Quando o tempo visível zera (ou é coletada): some e reinicia a espera de 25s (1500 frames)
*/
function atualizarCereja() {
  if (!cereja.visivel) {
    // contagem regressiva de espera
    cereja.espera--;
    if (cereja.espera <= 0) {
      // sorteia uma célula livre (tipo 0 = bolinha) para o spawn da cereja
      const livres = [];
      for (let l = 1; l < LINS - 1; l++) {
        for (let c = 1; c < COLS - 1; c++) {
          if (mapa[l][c] === 0) livres.push({ col: c, lin: l });
        }
      }
      if (livres.length > 0) {
        const escolha = livres[Math.floor(Math.random() * livres.length)];
        cereja.col     = escolha.col;
        cereja.lin     = escolha.lin;
        cereja.visivel = true;
        cereja.timer   = 900;   // fica visível por 15 segundos (15 × 60)
      }
    }
  } else {
    // contagem do tempo visível
    cereja.timer--;
    if (cereja.timer <= 0) {
      cereja.visivel = false;
      cereja.espera  = 1500;  // espera 25 segundos (25 × 60) antes de reaparecer
    }
  }
}

function proximoNivel() {
  nivel++; comidas = 0; timerPower = 0;
  mapa = MAPA0.map(l => [...l]);
  pac = criarPac(); fantasmas = criarFantasmas();
  cereja = { visivel: false, col: 9, lin: 13, timer: 0 };
  atualizarHUD();
}


// ── fantasmas ────────────────────────────────────────────────────
function moverFantasmas() {
  fantasmas.forEach(f => {
    if (f.modo === "assustado" && timerPower <= 0) f.modo = "aleatorio";

    // modo casa: espera timer e sobe pela coluna 9
    if (f.modo === "casa") {
      if (f.saidaTimer > 0) { f.saidaTimer--; return; }

      if (f.col !== 9) {
        f.t += VEL_F / T;
        const nc = f.col + Math.sign(9 - f.col);
        if (f.t >= 1) { f.col = nc; f.x = px(nc); f.t = 0; f.dCol = nc; f.dLin = f.lin; }
        else          { f.x = px(f.col) + (px(nc) - px(f.col)) * f.t; }
        return;
      }

      if (f.lin > 8) {
        f.t += VEL_F / T;
        const nl = f.lin - 1;
        if (f.t >= 1) { f.lin = nl; f.y = py(nl); f.t = 0; f.dCol = f.col; f.dLin = nl; }
        else          { f.y = py(f.lin) + (py(nl) - py(f.lin)) * f.t; }
        return;
      }

      f.modo = "aleatorio"; f.dx = 1; f.dy = 0;
      f.col = 9; f.lin = 8; f.x = px(9); f.y = py(8); f.t = 0; f.dCol = 9; f.dLin = 8;
      return;
    }

    // modo comido: olhos seguem o caminho pelo labirinto até o spawn via BFS
    if (f.modo === "comido") {
      const alvo = { col: 9, lin: 11 };

      if (f.col === alvo.col && f.lin === alvo.lin) {
        f.modo = "casa"; f.saidaTimer = 360; return;
      }

      f.t += (VEL_F * 0.9) / T;

      if (f.t >= 1) {
        // snap exato na célula de destino antes de calcular o próximo passo
        f.t = 0;
        f.x = px(f.col); f.y = py(f.lin);

        // BFS: encontra o próximo passo pelo labirinto até o spawn
        const visitado = Array.from({ length: LINS }, () => new Array(COLS).fill(false));
        const fila = [{ col: f.col, lin: f.lin, pai: null }];
        visitado[f.lin][f.col] = true;
        let encontrado = null;

        while (fila.length > 0) {
          const atual = fila.shift();
          if (atual.col === alvo.col && atual.lin === alvo.lin) { encontrado = atual; break; }
          for (const d of [{dc:1,dl:0},{dc:-1,dl:0},{dc:0,dl:1},{dc:0,dl:-1}]) {
            const nc = atual.col + d.dc, nl = atual.lin + d.dl;
            if (nc < 0 || nc >= COLS || nl < 0 || nl >= LINS) continue;
            if (visitado[nl][nc]) continue;
            if (!livreParaF(nc, nl, "comido")) continue;
            visitado[nl][nc] = true;
            fila.push({ col: nc, lin: nl, pai: atual });
          }
        }

        // pega o primeiro passo: caminho[1] (caminho[0] é a posição atual)
        if (encontrado) {
          const caminho = [];
          let n = encontrado;
          while (n !== null) { caminho.unshift(n); n = n.pai; }
          // guarda origem para interpolação ANTES de mover
          f.dCol = f.col; f.dLin = f.lin;
          if (caminho.length > 1) { f.col = caminho[1].col; f.lin = caminho[1].lin; }
        }

      } else {
        // interpola suavemente entre dCol/dLin (origem) e col/lin (destino)
        f.x = px(f.dCol) + (px(f.col) - px(f.dCol)) * f.t;
        f.y = py(f.dLin) + (py(f.lin) - py(f.dLin)) * f.t;
      }
      return;
    }

    // decide perseguir ou andar aleatório
    const velNivel  = VEL_F + (nivel - 1) * 0.08;
    const distNivel = DIST_PERSEGUIR + (nivel - 1) * T;

    if (f.modo === "aleatorio" || f.modo === "perseguir") {
      const dist = Math.hypot(pac.x - f.x, pac.y - f.y);
      f.modo = dist < distNivel ? "perseguir" : "aleatorio";
    }

    const velAtual = f.modo === "assustado" ? VEL_ASST : velNivel;
    f.t += velAtual / T;

    if (f.t >= 1) {
      f.col = f.dCol; f.lin = f.dLin;
      f.x = px(f.col); f.y = py(f.lin); f.t = 0;
      if (f.col < 0)    { f.col = COLS - 1; f.x = px(f.col); }
      if (f.col >= COLS){ f.col = 0;        f.x = px(f.col); }
      escolherDestino(f);
    } else {
      f.x = px(f.col) + (px(f.dCol) - px(f.col)) * f.t;
      f.y = py(f.lin) + (py(f.dLin) - py(f.lin)) * f.t;
    }
  });
}

function escolherDestino(f) {
  const dirs = [{ dc:1,dl:0 }, { dc:-1,dl:0 }, { dc:0,dl:1 }, { dc:0,dl:-1 }];
  const opcoes  = dirs.filter(d => !(d.dc === -f.dx && d.dl === -f.dy) && livreParaF(f.col + d.dc, f.lin + d.dl, f.modo));
  const validas = opcoes.length > 0 ? opcoes : dirs.filter(d => livreParaF(f.col + d.dc, f.lin + d.dl, f.modo));
  if (validas.length === 0) return;

  if (f.modo === "assustado" || f.modo === "aleatorio") {
    const e = validas[Math.floor(Math.random() * validas.length)];
    f.dx = e.dc; f.dy = e.dl; f.dCol = f.col + e.dc; f.dLin = f.lin + e.dl;
    return;
  }

  const ac = colDe(pac.x), al = linDe(pac.y);
  let melhor = validas[0], menorD = Infinity;
  for (const d of validas) {
    const dist = (f.col + d.dc - ac) ** 2 + (f.lin + d.dl - al) ** 2;
    if (dist < menorD) { menorD = dist; melhor = d; }
  }
  f.dx = melhor.dc; f.dy = melhor.dl; f.dCol = f.col + melhor.dc; f.dLin = f.lin + melhor.dl;
}


// ── colisão ──────────────────────────────────────────────────────
function colisao() {
  fantasmas.forEach(f => {
    if (f.modo === "casa" || f.modo === "comido") return;
    if (Math.hypot(pac.x - f.x, pac.y - f.y) < T / 2 - 2) {
      if (f.modo === "assustado") { f.modo = "comido"; pontos += 200; atualizarHUD(); }
      else perderVida();
    }
  });
}

function perderVida() {
  vidas--; atualizarHUD();
  if (vidas <= 0) {
    rodando = false;
    oH2.textContent = "GAME OVER\n\u2605 " + pontos + " \u2605";
    btnJogar.textContent = "\u21BA TENTAR DE NOVO";
    overlay.hidden = false;
  } else {
    pac = criarPac(); fantasmas = criarFantasmas(); timerPower = 0;
  }
}


// ================================================================
//  DESENHO
// ================================================================

function desenhar() {
  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, tela.width, tela.height);
  desenharLabirinto();
  desenharCereja();
  desenharPac();
  desenharFantasmas();
  desenharAnimCereja();

  if (pausado) {
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, tela.width, tela.height);
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 20px \'Press Start 2P\', monospace";
    ctx.textAlign = "center";
    ctx.fillText("PAUSADO", tela.width / 2, tela.height / 2 - 16);
    ctx.font = "10px \'Press Start 2P\', monospace";
    ctx.fillStyle = "#aaa";
    ctx.fillText("P ou ESPACO para continuar", tela.width / 2, tela.height / 2 + 14);
    ctx.textAlign = "left";
  }
}

function desenharLabirinto() {
  for (let l = 0; l < LINS; l++) {
    for (let c = 0; c < COLS; c++) {
      const x = c * T, y = l * T, v = mapa[l][c];

      if (v === 1) {
        ctx.fillStyle = "#000820"; ctx.fillRect(x, y, T, T);
        ctx.strokeStyle = "#1a4fff"; ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, T - 1, T - 1);

      } else if (v === 0 || v === 2) {
        ctx.fillStyle = "#ffeecc";
        ctx.beginPath(); ctx.arc(x + T/2, y + T/2, 2.5, 0, Math.PI * 2); ctx.fill();

      } else if (v === 3) {
        const p = 1 + 0.3 * Math.sin(Date.now() * 0.008);
        ctx.fillStyle = "#FFD700"; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(x + T/2, y + T/2, 5 * p, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  // borda azul da caixa de spawn
  ctx.strokeStyle = "#00aaff"; ctx.lineWidth = 2;
  ctx.strokeRect(8 * T + 1, 10 * T + 1, 4 * T - 2, 3 * T - 2);
}

// cereja: usa a sprite enviada, com fundo removido, tamanho duplo
function desenharCereja() {
  if (!cereja.visivel) return;
  if (cereja.timer < 180 && Math.floor(Date.now() / 200) % 2 === 0) return;
  const tam = T * 2;
  const x   = cereja.col * T - T / 2;
  const y   = cereja.lin * T - T / 2;
  const spr = (cerejaSF && cerejaSF.complete && cerejaSF.naturalWidth > 0) ? cerejaSF : spriteCereja;
  ctx.drawImage(spr, x, y, tam, tam);
}

// pac-man: usa spritesheet 32x64 (frame 0 = boca aberta, frame 1 = fechada)
function desenharPac() {
  const p   = pac;
  const tam = T + 22;  // pac-man bem visível
  const sy  = p.framePac * 32;
  const spr = (pacSF && pacSF.complete && pacSF.naturalWidth > 0) ? pacSF : spritePac;

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.ang);
  ctx.drawImage(spr, 0, sy, 32, 32, -tam / 2, -tam / 2, tam, tam);
  ctx.restore();
}

// fantasmas: sem fundo preto
function desenharFantasmas() {
  fantasmas.forEach((f, idx) => {
    const tam = T + 18;
    const x = f.x - tam / 2;
    const y = f.y - tam / 2;

    if (f.modo === "comido") {
      // anima os 2 frames dos olhos — troca a cada 30 frames (pisca mais devagar)
      f.timerOlhos++;
      if (f.timerOlhos >= 30) { f.timerOlhos = 0; f.frameOlhos = f.frameOlhos === 0 ? 1 : 0; }
      const spr = (olhosSF && olhosSF.complete && olhosSF.naturalWidth > 0) ? olhosSF : spriteOlhos;
      // recorta o frame correto (0 = y:0, 1 = y:32) do spritesheet 32x64
      ctx.drawImage(spr, 0, f.frameOlhos * 32, 32, 32, x, y, tam, tam);
      return;
    }

    let sprite;
    if (f.modo === "assustado") {
      const pisca = timerPower < 300 && Math.floor(Date.now() / 180) % 2 === 0;
      const base = pisca ? spriteBrnco : spriteAsst;
      const sf   = pisca
        ? (brncoSF  && brncoSF.complete  && brncoSF.naturalWidth  > 0 ? brncoSF  : base)
        : (asstSF   && asstSF.complete   && asstSF.naturalWidth   > 0 ? asstSF   : base);
      sprite = sf;
    } else {
      const base = f.spr;
      const sf   = fantasmasSF && fantasmasSF[idx] && fantasmasSF[idx].complete && fantasmasSF[idx].naturalWidth > 0
        ? fantasmasSF[idx] : base;
      sprite = sf;
    }

    ctx.drawImage(sprite, x, y, tam, tam);
  });
}

// texto flutuante "+1000" ao pegar cereja
function desenharAnimCereja() {
  if (!animCereja) return;
  const prog = animCereja.timer / 90;
  const yOff = (1 - prog) * 30;
  ctx.save();
  ctx.globalAlpha = prog;
  ctx.font = "bold 11px \'Press Start 2P\', monospace";
  ctx.fillStyle = "#FFD700";
  ctx.textAlign = "center";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 8;
  ctx.fillText("+500", animCereja.x, animCereja.y - yOff);
  ctx.restore();
}

function atualizarHUD() {
  sPontos.textContent = pontos;
  sVidas.textContent  = "\u2665".repeat(vidas);
  sNivel.textContent  = nivel;
}


// ── teclado ──────────────────────────────────────────────────────
document.addEventListener("keydown", e => {
  if ((e.key === "p" || e.key === "P" || e.key === " ") && rodando) {
    pausado = !pausado; e.preventDefault(); return;
  }
  if (!rodando || pausado) return;
  if (e.key === "ArrowLeft"  || e.key === "a") { pac.ndx = -1; pac.ndy =  0; }
  if (e.key === "ArrowRight" || e.key === "d") { pac.ndx =  1; pac.ndy =  0; }
  if (e.key === "ArrowUp"    || e.key === "w") { pac.ndx =  0; pac.ndy = -1; }
  if (e.key === "ArrowDown"  || e.key === "s") { pac.ndx =  0; pac.ndy =  1; }
  if (e.key.startsWith("Arrow")) e.preventDefault();
});

btnJogar.addEventListener("click", iniciarJogo);