
// ============================================================
// CANVAS
// ============================================================
const C   = document.getElementById('gameCanvas');
const ctx = C.getContext('2d');

const COLS = 19;
const ROWS = 21;
const CELL = Math.floor(Math.min(window.innerWidth / COLS, (window.innerHeight - 110) / ROWS));

C.width  = COLS * CELL;
C.height = ROWS * CELL;

// ============================================================
// SPRITES
// ============================================================
const GHOST_SPRITES = [];
const GHOST_SRCS = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAADz0lEQVR4nO2Wy2ucVRjGf993vst839wySTqTtBPaxiatlVZRvBTcWUHcuFHpQtyJazf+AS4FBReKoK4VXNqFICiISLsQwabUko5t00umSSaTZO7zXR4X7TozbQMuzLM5m/c853fe9z0X2Nf/XdajTDoOOgAUgT4QAV2gAVx/SE/nYRc/i6d3T56m1KpTtGOiociVD3KrPeTr2mUM6NojbmxXLWLrLOj8REVLYUZblYKug9bDCdVwdSNn6a+ZQN8fLesVEICXP6xRvva4AFlS3lw4yfREQM41pPd2qIaGwTAlW6mwk4isGbDQafP+bJWXcDRs3dybTBwGffjiM1K9Jq3c0g/HFnUjcFTP+/rx0Lx07bq0sqRvFypanp7V1VJV3x09oecfZGJPpKakpqRNSVdvaamQ11KuLF0eShuSWh3p5rKWslNaz0zp5wMzen0MgLFKEHJEz535mGdf/pQkC0xWcKcP0jBznHvrc0689hV4IfhFvLxLlLawPJt4DO+xAAq45LpdyoME0wV2+jRX18h5DqzXKW41YBPo9EhaO+SyPiaNMeOYj6NT2Pry+KvSpZb0x6Z+O3JGq+GUVtyCfjn0gnSpKS1d08W5Oa26vtYsVxcKRb09RglGdunTuHrv2CmOr19l3rUZRAGmG1Glh+eI1WiAOz1Bo7FFyQsIOz2MyRDNVvgpHXDubn3XNUaWoEzE6bTPEwkcJqLUXWOKJmFg0esNKFg23uYWczYczBgMkM86dG/fZMH1eHJEFkYCZIC0vUE+EXazzyQw6UJ/p0fe8wmBzBAKtkOr0SbvQNpuM2ss3H4bd4T/SIAm0PRS5PskCdgppDEYC7BSFKUASC4W3I9xoJ8ITEzyuAAGGPoOsWXTB4wsFIMEg0GEl4GwmGGr3yPwAiRAkHEhjuORXbgrwDwoBmxBq9sh9EOSVDjZEAuwDbT6sL3dJ8QQDwc47gNLgTT6ItwVwAZ8wMGQCbIMowTHeAxa3fsBKbgOFIsFPBPgu3mIDb0IjGcxHKaPDwDgWRkGvQjH8eknEQ4GBxc3U8CVT2+7R5SkKBIbigjCIsOuKOSnRgLs+h8YPhgjPBrZLKbT5UBmEgsYuhYrrQ38mTJbzRZlJ0/OzRA7eWrbTaaCHDt9RjbhrgA3wFoENY3HeilgeXOVd3KzpO0Og1KBb1rwd32NAjA56PFG9ShNHy5udPlgssp2Yka+ByNPwR2gPpHni9o/XAA+aa+y/tQivweGP4FfwToP1hVgeabEZ7U7XAE+unebu9Vpanv9O5oHHdnLd35f+9rXf61/AdZps1ycrcNGAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAADvUlEQVR4nO2Vy4scZRTFf19/VdWPqu6ezkxn0iBOXkpeBgkoCYKrIOJjodkoGDDqSiEh6MIEs0ggZIyQCCpGfPwLbgQ3CkEQSRAnkRjRqEkc4zid9HTXdFdV1/O6mH268thlzrrOuT/u/Q4Fy7rXpW7HtM1A3GTJbAECpMDvt5F3y4ZNICf37mS85lJIXcq6yHw7pd56nNcOnyIALt5Cbu4P14CMA5+98Qhr6n1C7zJaQkqJBmuM65RxUwuzVGfPezOcyZlduBXSD97ZTVEJQ7eLnYQ4KVAo40ZCkAXUyiGNaI4v9j3Eg0uXuXsAB6YPsP3gITYc/IQb5maGqsVCYZLzpa20jn3FhsNf0lbr0aFBM+3z0ds7uT8nRC4FoUjaj0W8vkjnvFx5fb38uW+byEJHJBARd06kfVrkyMMy+7Ip5w7tkHU5AHJtQFsbZdOOo2x96gRp2QEDfIE4a/H0Y4fZ8uhRxFkFdpFL7l9UJxWFbJFijmwjD0Aa/apWJB2J2ovoOIG4S7Oi8QOPymCeCcdABQkUEgpZTLAYYZU96jmyR27gAZCNINPPdPj5+1eg+x2zR/YzMWwzEZ7j+HMup7/dDYOzXHhrL1OygkZWoaUsqsDUiDOMrMpakE/3P8uU9Qd20Eb3wclSynoABaEbmZjVFgNPGHOKKP8ftJESqBr/ltfx5Ps/cOUmc0aeIAXsRsRw9jqTZoClfKxaBeIqkR/RqDpI7GImKcZQUBWPQQhWUaNUeNPhkOMECoj8HmMVG0cbWCZIzydOEijZpN4iKvEp1k2IF0kzcOoQDj0U8aj40QAmYJs2OoWhN4QUlK0ZSIgqgTYVJBF4LtoqEYYQDYtY2kBJeucABjC4voCVCqWKDQJZP6VmG/R6bZAAdAYVRRINcZwqWRhTtjRJOLg7G7hvRYOKJOC5EC2ZdObTHDdAC5Qh7kcYFuD3sdIM4pCV9QqrR7RgJEARSKIY3/fBy8AugAFyA+JuQpyCZGBOqKVRCgwTUh8Czxs5YCRACPT8Ic7KFtQc6GRggWoaaEejnDKhUcTvCVhVwIakRKoKYDqMegW5ahhW6lwLA1q1FjHzaA1dP8SojeHGBdIEVjUb9Lo9ikpjWgW0pehmFlfvtIa/gFp0mszZLZ4/cYn/xjdwgSbhuu3sOjnPCx/O8dKpOZ44fpHLjc1cG9/Cix9fZWZQxG+sHhWf72e0YNbZM/0N14BX3z1LZ2IzZzomc8AMqJ9A/Qhq1lnLrmNfcxV48/Pf+Dus5Ilf1rKWdY/rfxwIlhJ9xHuoAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAADtUlEQVR4nO2WS4iWVRjHf+e933zn4ozf5FzUwswuixYRBsIEtWgRZIiBSFToQsKVYFiKtYjIpBpJwSJjqoW4sVW7aF9I7SIwUFDH8ftm/N6Z9345p0UQuPH7RmdTzH934Dz/58ef5+EcWNN/TevYpFbTT9xP0RSPqQgL0PAomOOP+/JZMcBmWkrh8sH+U9RyHXWqGPF8Fu9cZXBjw54zb6wYZEUFW9iqjr0yw8ZwM8nSHL7pUnc1XMchFV0SLUcO+xw+f4hb/N6X94oAvjw4q/yFKdzEJ9QVsizQbI9UFhhmQ97oYI6yZHQ4cWEP17je01/rt/mHRz9SB06+zt5T0xB0sPEQpsONwb94+avneOnsTkSrS7ycM6wmeH/3J2xjrOfA9p1AkShlFYACYvjxrcsUhsOub5+AAEiADH44doW8XWGGN3jv4gH+5Oo9e/SdwLM7TrNz+jwYgA25K6i9R5je8SuPP30RfGAA5pIrDI1rZFWOhtfTt28AoxokXhD/JJCD4XkUtaBaBDcbgiWgBE83SaIustEp0VcPYPfzT/HbL29CDt+duIQQOmbd5vCr27n804uQwvcHfmasnsDN1tEamKLB6enb1wx8/vas0tuTjFpj6M08VZQy7GxFUzbL6U2C0KHMJYa0sXINCTQhdMKb7Jt94Z49jH4ANmvjJB2TluUhylFc2yJPJEnRZkNgU8USVer4lkXgQhRFmHmAoXoH3PPGBFtVeitho78et9AJ6hA9sxEFDLkBogZdgm1a1HVJki8TBB71Uk2or8IQWrg0SpESE4slCqNGGhpCM1HSQGoauSqRZkOuFSQWRFISeIOopmf/3gANDY4XIDWFPWBTiQalazS1IF4uMKSHIT1ErWGbHo4zQF3qyBzqQj44gASSLEXoGkmaYVg28+0OruvTWj+OvKPzkDmB3rWwUp9svmLAHMYnxNfDBwfQ0LFdh7wpKGRFWqWMTbYoZM6t23NYlk3n9iID/iBIQWukRZ7mREmEEL2XrCeAAOIiRjjgDtqURslyE9MtI4YnhiitEmfEISYmbiIWsg5aCM6IzXKz1BOg5xpmpFRmSWNULERtLNumlgW1U3M9v4YTmqRZjB261EpSyy625pAJizrIHhygoaKwEiLVYebSF7y77xhlXjGxZZJDpw9SkmJgkJNzfP9xlBKc/Ppj3tl1FHPovj9Kd+vMkW/UBh5W42xTj/KMOrf/gvrstfNqiifvem4/PXL23/MmtquZQ+dW9f+4pjWt6f+pvwHfjoeuFxp7pwAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAADtUlEQVR4nO2VS2hcVRyHv/s49zE3d14xadLQNGmRrhQXPkFEtF2IoKCCCC4EEazBlphC8YXFRdpNDYK4sUVcCKWLIqIrFQVXkbrxgahUKQkxM5nMzJ3Hfcy95x4XiktnUrMR8ludxfl/5+P8zwP28v/MrNotknlDVfvK0Kr+JWF3oXtNu1GBnRd6h9SjyyuY1gTdJEX3DVrNNebLNpeee2zHvJ0ViMPqoTcvElenCGiiXIsktfFNB6fXRcQ9xmzFRy+/AN0fR2LrO1n/5MpbGLZDJHMS0yVSOpYhyfttHJWhKYeOnOHYmQswfmikczKywNK58+rUwiMsL97FmNzA13xKqcVk+xofHL+d9xbuYMask6cm0prliVffHok7cgsaSqn23+MOcHzlB+zc48LSPBVADqBjwun3m1xvdJjzr3Nl4f6h/JF34N473+XBey5iAQXAyxQV5jl261XuO3KZigYlHbZaP1OdFoRpCOXhbRhZINbKNHoGCRACjlMgTqCR6PT1Ks0MIiA3TIKwQyiBXAzljixw9+O38dX3z9ABXnnnEyJh0hB1Hli8hcs/HaXuwrNnP0O60+RGBbs6C8odyh3pDDx1/kNVl4cxSvtI8z8Iogjbv5lME/TDTcqewIwjJA7b0sNxPSzZZipZ4+OTR/91jeEvYWlOMXGARs1CUCDJJxEVi26uCONt3IpLKxkgNAfbdnF1yPKQMBd0cYbiR2iBoNbu41fHidEZGGP0pU2iFIWSTyYlUgdch1RBGHYoFj06UYooFHdBwHARGMg0QMkAjQEoiak5qFjhSAM7A20Qo6kUM4ew08Mfq5Cn+S4IDCSO5UIuKfkOmqawLAtTM0niHNPwkLnAtItkyqR80xTdMEMiiAe7IQDEcYxhGERRjG271GpbmJZDqTpFMzERlYO0Moc+HpuBRPPGUfYYyvF3QcAwcG0HlQ7I05Q06nNgehI5CNncWMc0BM3tAEu4CMvFK5aQUtJsNtD14fjhM2RG1A0QuqTiWdhk6IMI4j5z0xO4ecK056BHAXrUJWnXKbsGE0WHLOkNxQ+/hmqAq2dYWkq7s0XBsJFJjJFDWmsx4br06uvsLxUJkxBDmAyCHpY1hq8NFxihBTk+MSJq8PW51yjJAKe7wZFxi2/OnOCLpadZPXuCzxefZH/0OzPpOqtvPI/b/oXqP9/XfxHo/KZVRMaV11+CzhqfLp9mkoDg16uQtyD8VqO5qtH/TjtotLn04sMa8TpfLp/CjWpD8XvZy1728ieClYq2sa04iQAAAABJRU5ErkJggg==",
];

const GHOST_SCARED       = new Image();
const GHOST_SCARED_BLINK = new Image();
GHOST_SCARED.src       = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAD2ElEQVR4nO2XzW9VRRiHn5kz5+Oec79aoBQwWEqMEBQIiMCiklSMCbJRF/gHmMiGv8eVuAYTiQvdiB+JmIAawYRITQwopmKg7b29957POWfGhW6MsfeUGhOT/tYzv/fJO+877wysQ2122/Ws39R/I29mQ8ciHm/XXosMwUowzp82CtwM9Hfr8lTrDt4+aWf3zVMRURoIPIU1AkFIMnzIw8VpW/XvAPdrgawPQB2yk9MvMkxmiFq7yPKErBjgOC6ymgC20+k06OkIG9+vZ1k/+DE7vf8VgnA/mZ5kuacIokmQQypjKPKI0N3ClqkujtQ8WrxrKW6NzYKsG3/vodcR7CMpIhINKgjJS0GcKyoZYqRDUmhy41HKLgdPnKnlWxsgTrtUdprSSqKOQyVjSpvguB66LHHCAdpZwipoTz7ByqoC9o/tkHoA7oxttp4EESG8jAfLtynFPdxGH2s1UmWgFnDCH1ka3CfWFiO2gZoaa12vBkzEIDaUVlIUAxa+vwDAkecuokSHyqRc//ICFTA/dwVZtsnjPpTeWOt6GZAdLA6FTuhONMkLMCU0XQ9dFPiOwAE8IMsLegMNqgNu998B2Hn4BaSraDZDkmFC6EGRgLINlJWUhUEARQVSNGhEXSoa7DhwYqz3+COQT1vP65KWhkLnZJXD3PFLeIRUaUi70eLRco+5599FSMWw36Ez6WMrH2MD/ijEO//YjjVqIMJTEUujh0QtlyDsorMYbSRKSHS+xNYtTarCQUiHzkRAkv6KsoIoagPOBjNgXNLhgEYQ4MgVjC4R1iIokCLF93uURoCYQluLru7ie5aQneh4CKQbBAA8RyJUxcefvQbAy6ffJxvm3LjxBlZBrmH+9EcMeyvcvHkeCcwduoRjSxAa1rgNagBojNRc/fwtTp2+iLWGq5+8SejAsZOXAbCu5dNr5xASjhy9TMuf4Itr5zj70ttg1x5KNSbWUbvnxKtYtYvlUY6xGc2oi2NbmNIjTcALJKldAikJg93EKymB1XSiRe5+c37NGDXa0GM4KNG5T+hPoWQLREQ8UvR70G7tZDTyaIUHEGYXWZoSRh7NcDvpyAWeWvM6Hg/genjCQQlFHueEvo+oSpSQbJvcymp/Bdcx9JZ+QZoYaQp0GuM6JVLkgF7TfjxAldBQBj3q0fYtZfKA365/iNQ9quQR7aBkaiJhx/TPrN56h5Zb4FvNaHWBTrsP/LTRGpi1sJ09z57BC0J++PoDkA6wg9mDx8nyGL+ZcO/bKyBd0DPMHD5F4A1Y+Oo94PbjPfv+rmfsX8frrIW9m/+ETW3q/6/fAZzzk8kJSIkNAAAAAElFTkSuQmCC";
GHOST_SCARED_BLINK.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAACyklEQVR4nO2WQYscVRSFv1evXld1z0xrCBHxh2UnIYtgDJNgCEIW7swmIIoBN27ij3Drj3ElBsfp7umqrqr37jtZdM9CkU51HBCkz/JCfffw3nn3Fhx11H8s9z4fKUlkgSVUB7IZ3jykhDsJBzGLQ5tHmTp6rDSs9hiZZmihzDAt6GU6hHeQ242SHA4j4vEM1uPw1H5CskjwgY0iwQVq50exR59AlOma6HA756LyBZApvKdJLScuUFgijjyJ0ScQY6/COVw2XFFAP0BdkWUoZbwLW1xMaFIwBE/tynfyy7EGSkoYBNmBZcgBcqaYepCH33qYVHBWothBmI3ijg+hFZAFMfPTF1/y+rNzaAfoe4iZnx885Zf7TyBBUdfYSOx4A9pd6Zs/UEyUGTDBJICJO37KLDlYLaEQRr45A3mIIm0Ag0/ucFUm1pMMJ35LqD2/5jXLUw+35whYtQs2iu8M4qgQ9jJ5wCnSLBeczefQdVBPWOfEaVlDW4Bg3Vww/eg2cYeeuv2DaZSBLNPqasH87AxHAjKgbSbcdY53GZEDHFY6OoxTN93bY9QrcMn4AA+bHpwHAU0L1Qy6DdQTCAYxgVUgw38YCGPYYwzoz0sxnfLi/JzSxPNX34Pg1flj5tWUi8tLnr3+EZzju0ePySHw7OULuDXHlfV77Zu/GoiDvnr4ubTppItLfX3vvr558FD6/Y20vJSu1vrh7j29vPuplFvl3OrbJ0+l9XAzIYzLhcrZyfYpGiCDZBBKcBlUQCMIjjSHVol5N4FVg/v41r8PobKJboC8Gy+hgtUKTmdQ+m1tiKCMBYefVNucqMD5/UtplIGua1VVFWSwtscHD768dgdlQXJbmDcgRhYuMq1mo7fiXmVJXdcp5yzl7UhUloZ1K5nUNI3W2tZt1UpdUiNpJR30b7BXXR+V/waUSTL9Y31zk82POuqo/7XeAq3im359+sGNAAAAAElFTkSuQmCC";

const CHERRY_IMG = new Image();
CHERRY_IMG.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAB/ElEQVR4nO3UO2iTURjG8f/35Z4mtYlJvLVNm1qJkSwiiJPg6lAEFUHxsukiBXERQYeigoJQAjoJgkLAVtHBCzqog/UCKgoqrZc6WIstjZiYaJr0cXBxadovsdv3287h5ZznnMN7wGaz2Wy2BnS0OPTv+HKmT7PVzsZsJMDo96oBkHajG2cPKewR2X5rIYx6N0+EXfo4NW08zPRKv35g+AJUTD+bDpyqe01LLmb6NHjumFKgB2f2qgvUDpafwDmfojQoAkwD34DT5/vo2X/UAEiAKq5mPjRwmzVtAF1KpnRleZuurexU7vhhrQfFQWk3envyoDaC1tVx+jklQLdbV2sk0KqRxTFp906NRMMaike0BTR+ZI+edS3V03BYd1s71fO/Q6RAQ6F25ZxRffZ4Neo3Ne5Ao0FTj1MhqXeHhg300x/SJ1dM9zrSSloMUbMNy0Deb9Jy5zpGLEjBDdWIj7JTVL/keJe9yrJFPigWiFaEN1+kbPGQNQO8B2MqGuLmth7aBgaZCAZ4XiwxkBMBVwvJ7C1yhRK/nSZNXh9muWL5Y5mz/sTLF4yluunfvouJJQkmu9fwCih74rzevI+2+4/46nAyOQOBSAyXxQDzap0ukBdwASUg+HeOrSvWUm0q4DNmaM67uTD2hifA8EK1ZC0p0KqFaEWbzbbQ/gBf+7hy3OHGWAAAAABJRU5ErkJggg==";

const BONUS_IMG = new Image();
BONUS_IMG.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAEfElEQVR4nO2YW2wUZRTHf7O7M53Z3XZpaSkgVCAKxmgCKCiagMUiPnBTIhqjPPiqJIUEFJSEyEWDohGDCQ8oTUyAErmUBsq23e62W6GUpYA1IQSIEsDStHQv3e5tdj8fmpI0rGZnoRLM/l4mc2bOOf9v8p185wzkyJEjx6NOmQMx4kmaq3feTTJFQrh+WilOVy8Tl+tXCs/eN8RTMmKqPCik9cB3hgSZMnnp6C97OFu9QUwC0XRyFWNH9TNajRLzX6GsZICag4sgAZ2HKsW+qu8NLS4jAfFkL2brnxypXcitnlbiyS58Zzs5faoDkxLBH7lKXf1b9Me6sdrND17A+LJpJCQbA7qCXDCWzivdtPhucPlGhFqXD8k6jtuhJNaiiRSOn2RIwENHMurw+ZolQtOCqFqA/rAfWS4mrtvYsM1tOBaAxcjLX68vF6/PH0ckGGC0QyYWlemPBSkomYhFf1as2/6bYREZ7YEhpk+fQJ6ll9H2MNG+S6jcprQwSqjnEgvKnzea27gAJU+jNxBEx4RFtWNWC4joMqq9lJTQRl5ASlKQ8wrwtnWAJZ9AWBDTbTgb2okkjJXfEIb2QFSXICUx7Zk5CCVOMqkiRAnWAh1FHZOVAMObpq2+UrR5j5CMdWEymRBSMTNnL2bu0l1ZVUFWTufcH4uWxsOkUilmzlrIvGXZJb8vXIfWiOaadSN/EubIkSNHjv8Nrqa9ac+Nf21IWo7uED7nt2kdOxrXprW3N6y/x97i3S5kOZqJznvxndgqAM64tw4L3OlZKzpclcNs3ubdosyOOHN81TC7q+6z7E/N1hN77jo7G3YNC+R2/jDs3ukZfO47NXhtPL47+8Su+v0P9Ky/2LRR+FybH17/cNZZmTb5PU3p6eZtYiDSx/yFXw1rs07VfCHmLFl/19ZSu1rEYwHskozF5GDF+9u5Ghps8Zp+3ibK39sgAfzq3CkUNUEi1p9WWNpe7kzDp0IoEaRUIbNf2SgBbH53qnhn+RyWLa9i/74KUkoCu12FuI4/ECWlFfH28mO4j35AVVUdGw/dyqhPTFuGsyu2Si/M/UZKJJIATAHR1X2TlBTicHUFqpoiX1NocDbi9rRSNKYYXdzhRP1iguHrhAd6Msn9zwKGeHnBJgngGkiTX5xFl0khZJ1Ad2Icdd4ezl/VOHetkMOebnRtMjcjZoKOEoqnz8pYwH0xOe/+/w9l1c9v+egJUWRNYlNMyBaV7kAI4chn9abfDccz7PDl2hlixaKZ6P7rEA9iRiIhawTM+Xja/mLdlnZDMQ3NhgAV5Y/j7/XiSCYZZVVI6DFCOqiWQua9NBVoNxTP0HQMEI/7KXIojC110Nd3G5M5gaaZkJJRrJrh9RgXYFHH0HUH6j0dyLZSIikr/fE8fBf+IBqXDQswLDmuF2KxPMaEJ20IVSM8ECLPVkREv0MgbPwLZFUFF1xrhOdkNaTCqKpCEo2nZ8xn3ps/jnwVDNFas0pcPO8lFArx6mtLeW7Bjv9+RD924EPhrv0kN6LnyJHj0eZvyZXF6DRXsgsAAAAASUVORK5CYII=";
const BONUS_FRAME_H = 32;
const BONUS_FRAMES  = 2;

GHOST_SRCS.forEach((src, i) => {
  const img = new Image();
  img.src = src;
  GHOST_SPRITES[i] = img;
});

// ============================================================
// MAPA
// 1=parede  2=ponto  3=bolinha grande  0=vazio  4=casa fantasma
// ============================================================
const MAP_ORIG = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,4,4,4,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,4,4,4,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ============================================================
// ESTADO DO JOGO
// ============================================================
let map, score, lives, level, state, animTick;
let pac;
let ghosts;
let scorePopups = [];
let cherry = null;
let bonus  = null;
let bonusTimer = 900;
let cherryTimer = 500;
let frightenTimer = 0;
let eatCombo      = 0;
let modeTimer     = 0;
let modeIndex     = 0;
let globalMode    = 'scatter';

// ============================================================
// EFEITO KAMEHAMEHA
// ============================================================
let kameEffect = null;

function spawnKamehameha(originX, originY) {
  const W = C.width, H = C.height;
  const particles = [];
  for (let i = 0; i < 80; i++) {
    const angle     = Math.random() * Math.PI * 2;
    const radius    = 4 + Math.random() * 30;
    const isGold    = Math.random() < 0.55;
    const hue       = isGold ? 40 + Math.random() * 25 : 185 + Math.random() * 55;
    const lightness = 60 + Math.random() * 40;
    particles.push({
      angle, radius,
      orbitSpeed: (Math.random() - 0.5) * 0.22,
      spreadVx:   (Math.random() - 0.5) * 16,
      spreadVy:   (Math.random() - 0.5) * 16,
      size:        1.5 + Math.random() * 5,
      color:      `hsl(${hue}, 100%, ${lightness}%)`,
      life:        0.4 + Math.random() * 0.6,
      exploded:    false,
    });
  }
  const beams = [];
  for (let i = 0; i < 14; i++) {
    const angle  = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const isGold = Math.random() < 0.55;
    const hue    = isGold ? 45 + Math.random() * 20 : 190 + Math.random() * 45;
    beams.push({
      angle, length: 0,
      maxLength: Math.hypot(W, H) * 1.25,
      width:     3 + Math.random() * 14,
      color:    `hsl(${hue}, 100%, ${70 + Math.random() * 30}%)`,
    });
  }
  const shockwaves = [];
  for (let i = 0; i < 5; i++) {
    shockwaves.push({
      radius: 0, maxRadius: Math.hypot(W, H),
      speed:  14 + i * 7, alpha: 1, delay: i * 7,
    });
  }
  kameEffect = {
    originX, originY, tick: 0,
    phase: 'charge',
    chargeEnd: 20, blastEnd: 65, fadeEnd: 105,
    particles, beams, shockwaves,
  };
}

function updateKamehameha() {
  if (!kameEffect) return;
  const k = kameEffect;
  k.tick++;
  if      (k.tick < k.chargeEnd) k.phase = 'charge';
  else if (k.tick < k.blastEnd)  k.phase = 'blast';
  else if (k.tick < k.fadeEnd)   k.phase = 'fade';
  else { kameEffect = null; return; }

  const blasting = k.phase !== 'charge';
  if (blasting) {
    for (const b of k.beams)
      b.length = Math.min(b.maxLength, b.length + b.maxLength * 0.055);
  }
  for (const s of k.shockwaves) {
    if (k.tick >= s.delay) {
      s.radius += s.speed;
      s.alpha   = Math.max(0, 1 - (s.radius / s.maxRadius) * 1.6);
    }
  }
  for (const p of k.particles) {
    if (blasting && !p.exploded) p.exploded = true;
    if (p.exploded) { p.angle += p.orbitSpeed * 0.2; p.radius += 7 + Math.random() * 3; }
    else            { p.angle += p.orbitSpeed; }
    p.life -= 0.011;
  }
}

function drawKamehameha() {
  if (!kameEffect) return;
  const k = kameEffect;
  const { originX: ox, originY: oy } = k;
  const W = C.width, H = C.height;
  const fadeAlpha = k.phase === 'fade'
    ? 1 - (k.tick - k.blastEnd) / (k.fadeEnd - k.blastEnd) : 1;

  ctx.save();

  if (k.phase === 'blast' && k.tick === k.chargeEnd) {
    ctx.save(); ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#fffde0'; ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  ctx.globalCompositeOperation = 'lighter';
  const glowMaxR = CELL * 4;
  const glowProgress = k.phase === 'charge'
    ? k.tick / k.chargeEnd
    : 1 - (k.tick - k.chargeEnd) / (k.fadeEnd - k.chargeEnd) * 0.4;
  const glowR = glowMaxR * Math.max(0, glowProgress);
  if (glowR > 1) {
    const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, glowR);
    grad.addColorStop(0,    `rgba(255,235,100,${0.95*fadeAlpha})`);
    grad.addColorStop(0.25, `rgba(80,210,255,${0.6*fadeAlpha})`);
    grad.addColorStop(1,    `rgba(0,0,0,0)`);
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(ox, oy, glowR, 0, Math.PI*2); ctx.fill();
  }

  if (k.phase !== 'charge') {
    for (const b of k.beams) {
      if (b.length < 1) continue;
      const tx = ox + Math.cos(b.angle) * b.length;
      const ty = oy + Math.sin(b.angle) * b.length;
      const ca = b.color.replace('hsl(','hsla(').replace(')',`, ${fadeAlpha})`);
      const cf = b.color.replace('hsl(','hsla(').replace(')',', 0)');
      const grad = ctx.createLinearGradient(ox, oy, tx, ty);
      grad.addColorStop(0, ca); grad.addColorStop(0.4, ca); grad.addColorStop(1, cf);
      ctx.strokeStyle = grad; ctx.lineWidth = b.width * fadeAlpha;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(tx, ty); ctx.stroke();
    }
  }

  ctx.globalCompositeOperation = 'source-over';
  for (const s of k.shockwaves) {
    if (s.radius <= 0 || k.tick < s.delay) continue;
    ctx.strokeStyle = `rgba(160,220,255,${s.alpha*0.65*fadeAlpha})`;
    ctx.lineWidth = 2.5; ctx.shadowColor = '#a0dcff'; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(ox, oy, s.radius, 0, Math.PI*2); ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.globalCompositeOperation = 'lighter';
  for (const p of k.particles) {
    if (p.life <= 0) continue;
    const px = ox + Math.cos(p.angle) * p.radius;
    const py = oy + Math.sin(p.angle) * p.radius;
    const alpha = Math.min(1, p.life) * fadeAlpha;
    const aura = ctx.createRadialGradient(px, py, 0, px, py, p.size*3);
    const c0 = p.color.replace('hsl(','hsla(').replace(')',`, ${alpha})`);
    const c1 = p.color.replace('hsl(','hsla(').replace(')',', 0)');
    aura.addColorStop(0, c0); aura.addColorStop(1, c1);
    ctx.fillStyle = aura;
    ctx.beginPath(); ctx.arc(px, py, p.size*3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = `rgba(255,255,255,${alpha*0.85})`;
    ctx.beginPath(); ctx.arc(px, py, p.size*0.55, 0, Math.PI*2); ctx.fill();
  }

  if (k.phase === 'blast') {
    const bp = (k.tick - k.chargeEnd) / (k.blastEnd - k.chargeEnd);
    const ta = bp < 0.25 ? bp/0.25 : bp > 0.75 ? 1-(bp-0.75)/0.25 : 1;
    const sc = 0.7 + bp * 0.65;
    ctx.globalCompositeOperation = 'source-over';
    ctx.save();
    ctx.globalAlpha = ta;
    ctx.translate(W/2, H/2); ctx.scale(sc, sc);
    ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 28;
    ctx.fillStyle = '#FFD700';
    ctx.font = `bold ${Math.round(CELL*1.7)}px Impact, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('★ MORANGO DOURADO! ★', 0, -CELL*1.3);
    ctx.shadowColor = '#00FFFF'; ctx.shadowBlur = 20;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(CELL*1.2)}px Impact, sans-serif`;
    ctx.fillText('+3500', 0, CELL*0.2);
    ctx.restore();
  }

  ctx.restore();
}

// ============================================================
// MODE CYCLE / SCATTER TARGETS
// ============================================================
const MODE_CYCLE = [900, 1200, 900, 1200, 600, 1200, 300, Infinity];
const SCATTER_TARGETS = [
  { col: 17, row: 0  }, { col: 1, row: 0  },
  { col: 17, row: 20 }, { col: 1, row: 20 },
];
const GHOST_START = [
  { col: 9,  row: 9,  exitDelay: 0    },
  { col: 8,  row: 10, exitDelay: 360  },
  { col: 10, row: 10, exitDelay: 720  },
  { col: 9,  row: 10, exitDelay: 1080 },
];

// ============================================================
// HELPERS DO MAPA
// ============================================================
function isWall(row, col) {
  if (col < 0 || col >= COLS) return false;
  if (row < 0 || row >= ROWS) return true;
  return MAP_ORIG[row][col] === 1;
}
function cloneMap() { return MAP_ORIG.map(r => [...r]); }
function dist(r1, c1, r2, c2) { return Math.hypot(r2-r1, c2-c1); }

// ============================================================
// INICIALIZAÇÃO
// ============================================================
function initGame() {
  map = cloneMap(); score = 0; lives = 3; level = 1;
  state = 'idle'; animTick = 0;
  frightenTimer = 0; eatCombo = 0;
  modeTimer = MODE_CYCLE[0]; modeIndex = 0; globalMode = 'scatter';
  kameEffect = null;
  document.getElementById('score').textContent = 0;
  document.getElementById('lives').textContent = 3;
  document.getElementById('level').textContent = 1;
  initPac(); initGhosts();
}

function initPac() {
  const startCol = 9, startRow = 16;
  pac = {
    col: startCol, row: startRow,
    pixelX: startCol*CELL+CELL/2, pixelY: startRow*CELL+CELL/2,
    targetCol: startCol, targetRow: startRow,
    progress: 1, dx: 0, dy: 0, nextDx: 0, nextDy: 0,
    speed: 0.07, mouthAngle: 0.25, mouthDir: 1,
  };
}

function initGhosts() {
  frightenTimer = 0; eatCombo = 0;
  modeTimer = MODE_CYCLE[0]; modeIndex = 0; globalMode = 'scatter';
  scorePopups = []; cherry = null; cherryTimer = 240;
  bonus = null; bonusTimer = 2700;
  ghosts = GHOST_START.map((s, i) => ({
    col: s.col, row: s.row,
    pixelX: s.col*CELL+CELL/2, pixelY: s.row*CELL+CELL/2,
    targetCol: s.col, targetRow: s.row,
    progress: 1, dx: 0, dy: 0, speed: 0.03,
    inHouse: true, exitDelay: s.exitDelay,
    frightened: false, dead: false,
  }));
}

// ============================================================
// PONTOS
// ============================================================
function eatDot() {
  const r = pac.row, c = pac.col;
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
  const v = map[r][c];
  if (v === 2) { map[r][c] = 0; score += 10; document.getElementById('score').textContent = score; }
  if (v === 3) {
    map[r][c] = 0; score += 50; document.getElementById('score').textContent = score;
    frightenTimer = 600; eatCombo = 0;
    ghosts.forEach(g => { if (!g.dead && !g.inHouse) g.frightened = true; });
  }
}
function countDots() {
  let n = 0;
  for (const row of map) for (const v of row) if (v === 2 || v === 3) n++;
  return n;
}

// ============================================================
// IA DOS FANTASMAS
// ============================================================
function chaseTarget(i) {
  switch (i) {
    case 0: return { col: pac.col, row: pac.row };
    case 1: return { col: pac.col+pac.dx*4, row: pac.row+pac.dy*4 };
    case 2: {
      const b = ghosts[0];
      const pc = pac.col+pac.dx*2, pr = pac.row+pac.dy*2;
      return { col: pc+(pc-b.col), row: pr+(pr-b.row) };
    }
    case 3: {
      const d = dist(ghosts[3].row, ghosts[3].col, pac.row, pac.col);
      return d > 8 ? { col: pac.col, row: pac.row } : SCATTER_TARGETS[3];
    }
  }
}

// ============================================================
// MOVIMENTO DOS FANTASMAS
// ============================================================
function stepGhost(g, i) {
  g.progress += g.speed;
  if (g.progress < 1) {
    const t = g.progress;
    g.pixelX = ((g.col*(1-t))+(g.targetCol*t))*CELL+CELL/2;
    g.pixelY = ((g.row*(1-t))+(g.targetRow*t))*CELL+CELL/2;
    return;
  }
  g.progress = 1; g.col = g.targetCol; g.row = g.targetRow;
  if (g.col < 0)     g.col = COLS-1;
  if (g.col >= COLS) g.col = 0;

  if (g.dead && g.col === 9 && g.row === 9) {
    g.dead = false; g.inHouse = true; g.exitDelay = 240;
    g.frightened = false; g.progress = 1; return;
  }

  let tCol, tRow;
  if (g.dead) { tCol = 9; tRow = 9; }
  else if (g.frightened) { tCol = Math.floor(Math.random()*COLS); tRow = Math.floor(Math.random()*ROWS); }
  else if (globalMode === 'scatter') { tCol = SCATTER_TARGETS[i].col; tRow = SCATTER_TARGETS[i].row; }
  else { const t = chaseTarget(i); tCol = t.col; tRow = t.row; }

  const DIRS = [{dc:1,dr:0},{dc:-1,dr:0},{dc:0,dr:1},{dc:0,dr:-1}];
  const valid = DIRS.filter(d => {
    if (d.dc === -g.dx && d.dr === -g.dy) return false;
    const nr = g.row+d.dr, nc = g.col+d.dc;
    if (isWall(nr, nc)) return false;
    if (!g.dead && nr === 9 && nc === 9) return false;
    return true;
  });

  if (valid.length === 0) {
    g.dx = -g.dx; g.dy = -g.dy;
    g.targetCol = g.col+g.dx; g.targetRow = g.row+g.dy;
    g.progress = 0; return;
  }

  valid.sort((a, b) =>
    dist(g.row+a.dr, g.col+a.dc, tRow, tCol) -
    dist(g.row+b.dr, g.col+b.dc, tRow, tCol)
  );
  g.dx = valid[0].dc; g.dy = valid[0].dr;
  g.targetCol = g.col+g.dx; g.targetRow = g.row+g.dy;
  g.progress = 0;
  const t = g.progress;
  g.pixelX = ((g.col*(1-t))+(g.targetCol*t))*CELL+CELL/2;
  g.pixelY = ((g.row*(1-t))+(g.targetRow*t))*CELL+CELL/2;
}

// ============================================================
// UPDATE DOS FANTASMAS
// ============================================================
function updateGhosts() {
  if (frightenTimer === 0) {
    modeTimer--;
    if (modeTimer <= 0) {
      modeIndex = Math.min(modeIndex+1, MODE_CYCLE.length-1);
      modeTimer = MODE_CYCLE[modeIndex];
      globalMode = modeIndex % 2 === 0 ? 'scatter' : 'chase';
      ghosts.forEach(g => { if (!g.inHouse && !g.dead) { g.dx=-g.dx; g.dy=-g.dy; } });
    }
  }
  if (frightenTimer > 0) {
    frightenTimer--;
    if (frightenTimer === 0) { ghosts.forEach(g => g.frightened = false); eatCombo = 0; }
  }

  for (let i = 0; i < ghosts.length; i++) {
    const g = ghosts[i];
    if (g.inHouse) {
      if (g.exitDelay > 0) { g.exitDelay--; continue; }
      const speed = CELL*0.04, tx = 9*CELL+CELL/2, ty = 8*CELL+CELL/2;
      if (Math.abs(g.pixelX-tx) > speed) {
        g.pixelX += g.pixelX < tx ? speed : -speed;
      } else {
        g.pixelX = tx;
        if (Math.abs(g.pixelY-ty) > speed) { g.pixelY -= speed; }
        else {
          g.pixelY = ty; g.col = 9; g.row = 8;
          g.targetCol = 9; g.targetRow = 8;
          g.inHouse = false; g.dx = 0; g.dy = -1; g.progress = 1;
        }
      }
      continue;
    }
    g.speed = g.dead ? 0.05 : g.frightened ? 0.04 : 0.05+level*0.003;
    stepGhost(g, i);
    const d = dist(g.row, g.col, pac.row, pac.col);
    if (d < 0.5 && !g.inHouse) {
      if (g.frightened) {
        g.frightened = false; g.dead = true; g.dx = 0; g.dy = 0;
        eatCombo++;
        const pts = 200 * Math.pow(2, eatCombo-1);
        score += pts; document.getElementById('score').textContent = score;
        scorePopups.push({ x: g.pixelX, y: g.pixelY, pts, timer: 90 });
      } else if (!g.dead) { loseLife(); return; }
    }
  }
}

// ============================================================
// UPDATE DO PAC-MAN
// ============================================================
function updatePac() {
  if (pac.dx !== 0 || pac.dy !== 0) {
    pac.mouthAngle += 0.05*pac.mouthDir;
    if (pac.mouthAngle > 0.28) pac.mouthDir = -1;
    if (pac.mouthAngle < 0.02) pac.mouthDir =  1;
  }
  pac.progress += pac.speed;
  if (pac.progress >= 1) {
    pac.progress = 1;
    pac.col = pac.targetCol; pac.row = pac.targetRow;
    if (pac.col < 0)     pac.col = COLS-1;
    if (pac.col >= COLS) pac.col = 0;
    eatDot();
    if ((pac.nextDx !== 0 || pac.nextDy !== 0) &&
        !isWall(pac.row+pac.nextDy, pac.col+pac.nextDx)) {
      pac.dx = pac.nextDx; pac.dy = pac.nextDy;
      pac.nextDx = 0; pac.nextDy = 0;
    }
    if (pac.dx !== 0 || pac.dy !== 0) {
      const nr = pac.row+pac.dy, nc = pac.col+pac.dx;
      if (!isWall(nr, nc)) { pac.targetCol = nc; pac.targetRow = nr; pac.progress = 0; }
      else { pac.dx = 0; pac.dy = 0; }
    }
  }
  const t = pac.progress;
  pac.pixelX = ((pac.col*(1-t))+(pac.targetCol*t))*CELL+CELL/2;
  pac.pixelY = ((pac.row*(1-t))+(pac.targetRow*t))*CELL+CELL/2;
  if (pac.pixelX < 0)           pac.pixelX += COLS*CELL;
  if (pac.pixelX > COLS*CELL)   pac.pixelX -= COLS*CELL;
}

// ============================================================
// VIDA / NÍVEL
// ============================================================
function loseLife() {
  lives--;
  document.getElementById('lives').textContent = lives;
  if (lives <= 0) {
    state = 'gameover';
    document.getElementById('msg').textContent = 'FIM DE JOGO! ENTER para reiniciar';
  } else {
    state = 'respawn';
    document.getElementById('msg').textContent = 'Vida perdida!';
    setTimeout(() => { initPac(); initGhosts(); state='playing'; document.getElementById('msg').textContent=''; }, 1500);
  }
}

function nextLevel() {
  level++;
  document.getElementById('level').textContent = level;
  map = cloneMap(); initPac(); initGhosts();
  document.getElementById('msg').textContent = 'Nível ' + level + '!';
  setTimeout(() => { document.getElementById('msg').textContent = ''; }, 1500);
}

// ============================================================
// CEREJA
// ============================================================
const CHERRY_FORBIDDEN_ROWS = [9, 10];
function cherrySpawnCells() {
  const cells = [];
  for (let r = 1; r < ROWS-1; r++) {
    if (CHERRY_FORBIDDEN_ROWS.includes(r)) continue;
    for (let c = 1; c < COLS-1; c++)
      if (MAP_ORIG[r][c] === 0 || MAP_ORIG[r][c] === 2) cells.push({ col: c, row: r });
  }
  return cells;
}

function updateCherry() {
  if (cherry === null) {
    cherryTimer--;
    if (cherryTimer <= 0) {
      const cells = cherrySpawnCells();
      cherry = cells[Math.floor(Math.random()*cells.length)];
      cherry.lifetime = 480;
    }
    return;
  }
  cherry.lifetime--;
  if (cherry.lifetime <= 0) { cherry = null; cherryTimer = 240; return; }
  if (Math.abs(cherry.col-pac.col) < 0.8 && Math.abs(cherry.row-pac.row) < 0.8) {
    score += 1000; document.getElementById('score').textContent = score;
    scorePopups.push({ x: cherry.col*CELL+CELL/2, y: cherry.row*CELL+CELL/2, pts: 1000, timer: 90 });
    cherry = null; cherryTimer = 240;
  }
}

// ============================================================
// BÔNUS
// ============================================================
function updateBonus() {
  if (bonus === null) {
    bonusTimer--;
    if (bonusTimer <= 0) {
      const cells = cherrySpawnCells();
      bonus = cells[Math.floor(Math.random()*cells.length)];
      bonus.lifetime = 700;
    }
    return;
  }
  bonus.lifetime--;
  if (bonus.lifetime <= 0) { bonus = null; bonusTimer = 1000; return; }
  if (Math.abs(bonus.col-pac.col) < 0.8 && Math.abs(bonus.row-pac.row) < 0.8) {
    score += 3500; document.getElementById('score').textContent = score;
    const bx = bonus.col*CELL+CELL/2, by = bonus.row*CELL+CELL/2;
    spawnKamehameha(bx, by);
    scorePopups.push({ x: bx, y: by, pts: 3500, timer: 90 });
    bonus = null; bonusTimer = 2700;
  }
}

// ============================================================
// UPDATE PRINCIPAL
// ============================================================
function update() {
  if (state !== 'playing') return;
  animTick++;
  updatePac();
  updateGhosts();
  updateCherry();
  if (level >= 2) updateBonus();
  updateKamehameha();
  if (countDots() === 0) nextLevel();
}

// ============================================================
// DESENHO DO PAC-MAN
// ============================================================
function drawPacman() {
  const x = pac.pixelX, y = pac.pixelY;
  const r = CELL*0.44, mouth = pac.mouthAngle;
  let angle = 0;
  if      (pac.dx > 0) angle = 0;
  else if (pac.dx < 0) angle = Math.PI;
  else if (pac.dy < 0) angle = -Math.PI/2;
  else if (pac.dy > 0) angle =  Math.PI/2;
  ctx.save();
  ctx.translate(x, y); ctx.rotate(angle);
  ctx.beginPath(); ctx.moveTo(0,0);
  ctx.arc(0, 0, r, mouth*Math.PI, (2-mouth)*Math.PI);
  ctx.closePath(); ctx.fillStyle = '#FFE000'; ctx.fill();
  ctx.beginPath(); ctx.arc(r*0.2, -r*0.45, r*0.11, 0, Math.PI*2);
  ctx.fillStyle = '#000'; ctx.fill();
  ctx.restore();
}

// ============================================================
// DESENHO DOS FANTASMAS
// ============================================================
function drawGhosts() {
  ctx.imageSmoothingEnabled = false;
  for (let i = 0; i < ghosts.length; i++) {
    const g = ghosts[i], img = GHOST_SPRITES[i], size = CELL*1.03;
    if (g.dead) {
      ctx.save(); ctx.translate(g.pixelX, g.pixelY);
      const r = size/2;
      [[-r*0.3,-r*0.1],[r*0.3,-r*0.1]].forEach(([ex,ey]) => {
        ctx.beginPath(); ctx.arc(ex,ey,r*0.28,0,Math.PI*2); ctx.fillStyle='#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(ex+r*0.07,ey+r*0.1,r*0.15,0,Math.PI*2); ctx.fillStyle='#00f'; ctx.fill();
      });
      ctx.restore(); continue;
    }
    if (g.frightened) {
      const blink = frightenTimer < 240 && Math.floor(animTick/8)%2 === 0;
      const scaredImg = blink ? GHOST_SCARED_BLINK : GHOST_SCARED;
      const scaredSize = CELL*1.3;
      if (scaredImg.complete) {
        ctx.save(); ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(scaredImg, g.pixelX-scaredSize/2, g.pixelY-scaredSize/2, scaredSize, scaredSize);
        ctx.restore();
      }
      continue;
    }
    if (!img || !img.complete) continue;
    ctx.drawImage(img, g.pixelX-size/2, g.pixelY-size/2, size, size);
  }
}

// ============================================================
// DESENHO DAS PAREDES
// ============================================================
function drawWalls() {
  const half = CELL/2, cw = Math.round(CELL*0.28);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, C.width, C.height);
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (MAP_ORIG[r][c] === 1) { ctx.fillStyle='#1919ff'; ctx.fillRect(c*CELL,r*CELL,CELL,CELL); }

  function W(r,c) {
    if (r<0||r>=ROWS||c<0||c>=COLS) return false;
    return MAP_ORIG[r][c]===1;
  }
  ctx.fillStyle = '#000';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!W(r,c)) continue;
      const px=c*CELL, py=r*CELL, cx=px+half, cy=py+half;
      const A=W(r-1,c), B=W(r+1,c), L=W(r,c-1), R=W(r,c+1);
      const AL=W(r-1,c-1), AR=W(r-1,c+1), BL=W(r+1,c-1), BR=W(r+1,c+1);
      if (L) ctx.fillRect(px,cy-cw,cx-px+1,cw*2);
      if (R) ctx.fillRect(cx,cy-cw,px+CELL-cx+1,cw*2);
      if (A) ctx.fillRect(cx-cw,py,cw*2,cy-py+1);
      if (B) ctx.fillRect(cx-cw,cy,cw*2,py+CELL-cy+1);
      if (A&&L&&AL) ctx.fillRect(px,py,cx-px,cy-py);
      if (A&&R&&AR) ctx.fillRect(cx,py,px+CELL-cx,cy-py);
      if (B&&L&&BL) ctx.fillRect(px,cy,cx-px,py+CELL-cy);
      if (B&&R&&BR) ctx.fillRect(cx,cy,px+CELL-cx,py+CELL-cy);
    }
  }
  const lw = Math.max(2, Math.round(CELL*0.13));
  ctx.strokeStyle='#1919ff'; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.lineCap='round';
  ctx.beginPath();
  ctx.moveTo(7*CELL,12*CELL); ctx.lineTo(7*CELL,9*CELL);
  ctx.lineTo(9*CELL,9*CELL); ctx.moveTo(10*CELL,9*CELL);
  ctx.lineTo(12*CELL,9*CELL); ctx.lineTo(12*CELL,12*CELL); ctx.lineTo(7*CELL,12*CELL);
  ctx.stroke();
  ctx.strokeStyle='#ffb8ff'; ctx.lineWidth=Math.max(2,Math.round(CELL*0.18));
  ctx.beginPath();
  ctx.moveTo(9*CELL+CELL*0.1,9*CELL); ctx.lineTo(10*CELL-CELL*0.1,9*CELL);
  ctx.stroke();
}

// ============================================================
// DESENHO DOS PONTOS
// ============================================================
function drawDots() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const v=map[r][c], cx=c*CELL+CELL/2, cy=r*CELL+CELL/2;
      if (v===2) { ctx.beginPath(); ctx.arc(cx,cy,CELL*0.09,0,Math.PI*2); ctx.fillStyle='#ffb8ae'; ctx.fill(); }
      else if (v===3) {
        const pulse = 1+Math.sin(animTick*0.1)*0.18;
        ctx.beginPath(); ctx.arc(cx,cy,CELL*0.21*pulse,0,Math.PI*2); ctx.fillStyle='#ffb8ae'; ctx.fill();
      }
    }
  }
}

// ============================================================
// CEREJA — desenho
// ============================================================
function drawCherry() {
  if (!cherry || !CHERRY_IMG.complete) return;
  ctx.imageSmoothingEnabled = false;
  const size = CELL*1.5;
  if (cherry.lifetime < 120 && Math.floor(animTick/8)%2===0) return;
  ctx.drawImage(CHERRY_IMG, cherry.col*CELL+CELL/2-size/2, cherry.row*CELL+CELL/2-size/2, size, size);
}

// ============================================================
// BÔNUS — desenho (sprite parado no spawn, aura dourada)
// ============================================================
function drawBonus() {
  if (!bonus || !BONUS_IMG.complete) return;
  ctx.imageSmoothingEnabled = false;
  if (bonus.lifetime < 360 && Math.floor(animTick/8)%2===0) return;

  const bx   = bonus.col*CELL+CELL/2;
  const by   = bonus.row*CELL+CELL/2;
  const size = CELL*1.4;

  // Aura dourada pulsante
  const pulse = 1+Math.sin(animTick*0.13)*0.28;
  const auraR = size*0.85*pulse;
  const aura  = ctx.createRadialGradient(bx,by,0,bx,by,auraR);
  aura.addColorStop(0,   'rgba(255,215,  0,0.60)');
  aura.addColorStop(0.5, 'rgba(255,130,  0,0.28)');
  aura.addColorStop(1,   'rgba(255,215,  0,0)');
  ctx.save(); ctx.globalCompositeOperation='lighter';
  ctx.fillStyle=aura; ctx.beginPath(); ctx.arc(bx,by,auraR,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // Sempre frame 0 — sprite parado no mapa (animação só no efeito de coleta)
  ctx.drawImage(BONUS_IMG, 0, 0, 32, BONUS_FRAME_H, bx-size/2, by-size/2, size, size);
}

// ============================================================
// POPUPS DE PONTUAÇÃO
// ============================================================
function drawScorePopups() {
  for (let i = scorePopups.length-1; i >= 0; i--) {
    const p = scorePopups[i];
    p.timer--; p.y -= 0.5;
    if (p.timer <= 0) { scorePopups.splice(i,1); continue; }
    const alpha = Math.min(1, p.timer/30);
    ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle='#fff';
    ctx.font=`bold ${Math.round(CELL*0.55)}px monospace`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('+'+p.pts, p.x, p.y);
    ctx.restore();
  }
}

// ============================================================
// RENDER PRINCIPAL
// ============================================================
function draw() {
  drawWalls(); drawDots(); drawGhosts();
  drawCherry();
  if (level >= 2) drawBonus();
  drawKamehameha();
  drawScorePopups();
  if (state !== 'idle') drawPacman();
}

// ============================================================
// GAME LOOP
// ============================================================
function loop() { update(); draw(); requestAnimationFrame(loop); }

// ============================================================
// CONTROLES — TECLADO
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (state==='idle'||state==='gameover') { initGame(); state='playing'; document.getElementById('msg').textContent=''; }
    else if (state==='playing') { state='paused'; document.getElementById('msg').textContent='PAUSADO — ENTER para continuar'; }
    else if (state==='paused')  { state='playing'; document.getElementById('msg').textContent=''; }
    return;
  }
  const dirs = { ArrowLeft:{dx:-1,dy:0}, ArrowRight:{dx:1,dy:0}, ArrowUp:{dx:0,dy:-1}, ArrowDown:{dx:0,dy:1} };
  if (dirs[e.key]) { e.preventDefault(); pac.nextDx=dirs[e.key].dx; pac.nextDy=dirs[e.key].dy; }
});

// ============================================================
// CONTROLES — SWIPE (mobile)
// ============================================================
let t0x = null, t0y = null;
C.addEventListener('touchstart', e => { t0x=e.touches[0].clientX; t0y=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
C.addEventListener('touchend', e => {
  if (t0x===null) return;
  const dx=e.changedTouches[0].clientX-t0x, dy=e.changedTouches[0].clientY-t0y;
  if (Math.abs(dx)<8&&Math.abs(dy)<8) { t0x=t0y=null; return; }
  if (Math.abs(dx)>Math.abs(dy)) { pac.nextDx=Math.sign(dx); pac.nextDy=0; }
  else                           { pac.nextDx=0; pac.nextDy=Math.sign(dy); }
  t0x=t0y=null;
}, {passive:false});

// ============================================================
// INICIA
// ============================================================
initGame();
loop();
