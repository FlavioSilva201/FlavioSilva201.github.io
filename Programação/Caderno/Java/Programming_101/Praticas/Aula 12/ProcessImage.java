/**
  Programa de manipulação de imagens (em formato Plain PGM).
  Usar e modificar em exercício de Programação I.
  João Rodrigues <jmr@ua.pt>
  2013, 2014.
  
  Modificado por Diogo Daniel Soares Ferreira (Fun��o rotate e sua implementa��o)
  2014
**/

package p1;

import java.util.Scanner;
import java.io.*;

public class ProcessImage {
  static Scanner kb = new Scanner(System.in);

  public static void main(String[] args) throws IOException {
    String name;
    File f;
    do {
      System.out.print("Imagem a processar? ");
      name = kb.nextLine();
      f = new File(name);
    } while (!(f.isFile() && f.canRead()));

    // Carrega imagem do ficheiro para a matriz img:
    int[][] img = loadPGM(f);

    // Pode usar a função abaixo para mostrar a imagem em formato de texto:
    printImage(img);   // (convém maximizar o terminal...)

    System.out.print("Limiar (0 - 255)? "); // tentar 128...
    int thr = kb.nextInt();

    // Faz o "thresholding" da imagem:
    // Ver http://en.wikipedia.org/wiki/Thresholding_%28image_processing%29
    threshold(img, thr);

    // Crie uma função rotate que rode a imagem -90 graus, para usar assim:
    // int[][] nova = rotate(img);
    rotate(img);

    f = new File("out.pgm");
    // Grava imagem da matriz img para ficheiro out.pgm:
    savePGM(f, img);
    System.out.printf("Imagem processada gravada em %s e alterada num �ngulo de 90�.", f);
  }

  // Salta comentários até próximo inteiro
  public static void skipComments(Scanner sf) {
    while (!sf.hasNextInt()) {
      String s = sf.next();
      if (s.charAt(0) != '#') {
        System.err.printf("Invalid format!\n");
        System.exit(1);
      }
      sf.nextLine(); // É comentário => descarta resto da linha
    }
  }

  // Carrega uma imagem de um ficheiro PGM ASCII (Plain PGM).
  // Ver http://netpbm.sourceforge.net/doc/pgm.html
  // BUGS:
  //   Não devolve Maximum gray value.
  //   Não aceita comentários no ficheiro.
  public static int[][] loadPGM(File f) throws IOException {
    Scanner sf = new Scanner(f);
    String s = sf.next();
    if (!s.equals("P2")) {
      System.err.printf("%s: not a plain PGM file\n", f);
      System.exit(1);
    }
    int w, h;
    skipComments(sf); w = sf.nextInt();
    skipComments(sf); h = sf.nextInt();
    skipComments(sf); sf.nextInt();
    int[][] image = new int[h][w];
    int x, y;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        image[y][x] = sf.nextInt();
      }
    }
    sf.close();
    return image;
  }

  // Guarda uma imagem num ficheiro PGM ASCII (Plain PGM).
  // Ver http://netpbm.sourceforge.net/doc/pgm.html
  // BUGS:
  //   Fixa maximum gray value = 255.
  public static void savePGM(File f, int[][] img) throws IOException {
    PrintWriter pw = new PrintWriter(f);
    pw.printf("P2\n%d %d\n%d\n", img[0].length, img.length, 255);
    int x, y;
    int h = img.length;
    for (y = 0; y < h; y++) {
      int w = img[0].length;
      for (x = 0; x < w; x++) {
        pw.printf("%d\n", img[y][x]);
      }
    }
    pw.close();
  }
  
  public static void threshold(int[][] img, int thr) {
    int x, y;
    int h = img.length;
    for (y = 0; y < h; y++) {
      int w = img[0].length;
      for (x = 0; x < w; x++) {
        img[y][x] = (img[y][x] >= thr) ? 255 : 0;
      }
    }
  }

  // Tabela de símbolos para representar níveis de cinzento em AsciiArt:
  static final String scaleAA = "#@8%Oo\";,'. ";

  // Converte imagem em AsciiArt (google it!)
  // BUG: Presume max-gray-value=255!
  public static void printImage(int[][] img) {
    int x, y;
    int h = img.length;
    for (y = 0; y < h; y++) {
      int w = img[0].length;
      for (x = 0; x < w; x++) {
        int val = img[y][x] * scaleAA.length() / (255+1); // mudança de escala
        System.out.printf("%c", scaleAA.charAt(val));
      }
      System.out.println();
    }
  }

  public static void rotate (int[][] img) {
	  
	  int imgo[][]=img.clone();
	  int h=imgo.length;
	  for(int i=0; i<h; i++){
		  int w=imgo[0].length;
		  for(int j=0; j<w; j++){
			  img[j][h-1-i]=imgo[i][j];
		  }
	  }

  }
  
}
