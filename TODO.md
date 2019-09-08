Object types
- [x] wall (1)
- [x] door (1)
- [x] switch (1)
  - [x] momentary (1)
  - [x] on/off (1)
- [ ] goal (1)
- [ ] spikes on ground (2)
- [ ] spikes on wall
- [ ] spikes on ceiling
- [ ] laser
- [ ] ladder
- [ ] static platform
- [ ] falling platform
- [ ] one-way platform (up)
- [ ] two-way platform?
- [ ] automated moving platform
- [ ] spring/bounce
- [ ] spear in wall?
- [ ] icy (slippery) ground
- [ ] mud (sticky) ground
- [ ] ability selection (4?)

Powerups/objects
- [ ] coin
- [ ] time pause powerup

Features
- [x] collision between player and object (1)
- [ ] collision between object and object
- [ ] stick to object
- [ ] player pushing object
- [ ] player pushed by object
- [ ] death
- [x] gravity (1)
- [x] switch emitter (1)
- [x] switch receiver (1)

Abilities
- [ ] jump
- [ ] double jump
- [ ] wall jump
- [ ] box push
- [ ] dash
- [ ] throw a spear? (and jump on it?)
- [ ] catch/drop
- [ ] drop -> throw
- [ ] glide

Misc
- [x] input handler (1)
- [x] input sequence record/replay (1)
- [ ] gamepad support
- [ ] screen position, zoom, etc.

Editor
- [x] wall layer (2)
- [x] room layer (2)
- [x] objects (2)
- [x] add new object (3)
- [ ] level size (3)
- [ ] ability setup
- [ ] mouse movement
- [x] grid with colors for tools
- [x] delete objects (2)

Menu
- [ ] main menu
- [ ] calibration

Graphics
- [ ] objects
- [ ] main menu
- [ ] calibration
- [ ] transition menu to/from game

Tutorial
...

Music
...

SFX
...

Misc
- [ ] automatic build system (+)
- [ ] travis integration (+)

Notes

a grafika lehetne vektorgrafikus, egy 32x32-es griden görbék, kitöltések,
vonalvastagságok, aztán az objektumnál egy tulajdonság, hogy ténylegesen
mekkora. így nem kéne óriási/túl kicsi számokkal dolgozni, csak
egészekkel. scale-elésnél megmaradhatnának az arányok.

a masrshmallow emberke lehetne akár csak egy jó vastag görbéből, a
körvonala egy még vastagabb görbe mögötte. megúsznám a sok koordinátát,
ami a teljes alakzat külső részéhez kell. az árnyalást pedig extar
görbedarabokkal lehetne rárakni

egy objektum több ilyen grafikai cuccból állhatna össze (pl. test,
szemek, száj, kezek és lábak), újrahasználva a grafikákat, pozíció és
forgatás is lehet. a változó cuccokat (pl. szem és száj) még nem tudom,
hogy lehetne megoldani, de akár az objektumot kirajzoló eljárásban
if()-elve

a háttér/gfx (a "fal", ami legelől van; a bal oldalsó fal; a padló; a
háttér) legyen előre renderelve és blokkokban kirakva? vagy legyen 3-4
layer és megfelelő helyen maszkolva? note: ez statikus, elég szintenként
egyszer renderelni

hangokat lehetne zenei (sonant-x?) hangszerekkel csinálni, esetleg egy
sima külön pattern egy hangjeggyel a lejátszásukra

pálya megnyereésénél automatikusan legyen vége, vag csak kiírja, hogy
nyertél és külön gombbal lehet továbbmenni?

nyerés után összegző képernyő?

