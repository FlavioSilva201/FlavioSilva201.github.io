import java.util.*;

public class distanciaPontos {
 
  static Scanner sc = new Scanner (System.in);
  
  public static void main(String[] args) {
    
    int i = 0;
    double sum = 0;
    double dmax = 0;
    
    Ponto2D dm = new Ponto2D();
    dm.x=0;
    dm.y=0;
    
    Ponto2D b = new Ponto2D();
    
    do{
      b=lerPonto();
      printPonto(b);
      if(b.x==0 && b.y==0) break;
      
      i++;
      
      sum+=dorigem(b);
      
      if(dorigem(b)>dmax){
        dm.x=b.x;
        dm.y=b.y;
        dmax=dorigem(b);
      }
      
    }while(b.x!=0 && b.y!=0);
    
    System.out.println("A soma das distâncias dos " + i + " pontos à origem é " + sum);
    System.out.println("O ponto mais afastado da origem foi: (" + dm.x + ", " + dm.y + ")");
    
    
  }
  
  public static class Ponto2D{
   double x, y; 
  }
  
  public static Ponto2D lerPonto(){
    Ponto2D a = new Ponto2D();
    
    System.out.print("Insira a abcissa de um ponto: ");
    a.x=sc.nextDouble();
    
    System.out.print("\nInsira a ordenada de um ponto: ");
    a.y=sc.nextDouble();
    
    return a;
  }
  
  public static void printPonto(Ponto2D b){
    System.out.println("("+b.x+","+b.y+")");
  }
  
  public static double distancia(Ponto2D p, Ponto2D q){
    double d;
    
    d=Math.sqrt(Math.pow((p.x-q.x),2)-Math.pow((p.y-q.y),2));
    
    return d;
  }
  
  public static double dorigem(Ponto2D b){
   double d;
   
   d=Math.sqrt(Math.pow(b.x,2)+Math.pow(b.y,2));
   
   return d;
  }
  
}