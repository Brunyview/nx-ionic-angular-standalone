# To add a new font

- copy a new directory containing the fonts to the 'src/lib/fonts' directory

- add  entries for the new fonts in the 'src/lib/_global.scss' file

example:

@font-face {
  font-family: 'Comforter_Brush';
  src: url('./fonts/Comforter_Brush/ComforterBrush-Regular.ttf');
}
