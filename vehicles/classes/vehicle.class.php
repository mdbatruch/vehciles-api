<?php
class Vehicle {
  
    private $conn;
    private $table_name = "Vehicle";
  
    public $id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $category_name;
    public $created;
  
    public function __construct($db){
        $this->conn = $db;
    }

    public function create_vehicle($year, $make, $model, $variant = '', $trim, $bodyType, $transmission, $fuelType, $displacement, $buyer, $soldPrice, $soldDate, $seller, $askPrice, $status) {
        try {
            $stmt = $this->conn->prepare('INSERT INTO Vehicle (year, make, model, variant, trim, body_type, transmission, fuel_type, displacement, buyer, sold_price, sold_date, seller, ask_price, status)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            
            $stmt->bindParam(1, $year);
            $stmt->bindParam(2, $make);
            $stmt->bindParam(3, $model);
            $stmt->bindParam(4, $variant);
            $stmt->bindParam(5, $trim);
            $stmt->bindParam(6, $bodyType);
            $stmt->bindParam(7, $transmission);
            $stmt->bindParam(8, $fuelType);
            $stmt->bindParam(9, $displacement);
            $stmt->bindParam(10, $buyer);
            $stmt->bindParam(11, $soldPrice);
            $stmt->bindParam(12, $soldDate);
            $stmt->bindParam(13, $seller);
            $stmt->bindParam(14, $askPrice);
            $stmt->bindParam(15, $status);

            $stmt->execute() or die(print_r($stmt->errorInfo(), true));

        } catch (Exception $e) {
                    
            echo $e->getMessage();
        }
    }

    public function create(){
    
        $stmt = $this->conn->prepare("INSERT INTO " . $this->table_name . " SET name=:name, price=:price, description=:description, image=:image, category_id=:category_id, created=:created");
    
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":created", $this->created);
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    public function update(){
  
        $stmt = $this->conn->prepare("UPDATE " . $this->table_name . " SET name = :name, price = :price, description = :description, image = :image, category_id = :category_id WHERE id = :id");
      
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':id', $this->id);
      
        if($stmt->execute()){
            return true;
        }
      
        return false;
    }

    public function delete(){
  
        $stmt = $this->conn->prepare("DELETE FROM " . $this->table_name . " WHERE id = ?");
      
        $this->id=htmlspecialchars(strip_tags($this->id));
      
        $stmt->bindParam(1, $this->id);
      
        if($stmt->execute()){
            return true;
        }
      
        return false;
    }


    public function getAll(){

        $products = [];

        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
        // select all products query
        $query = "SELECT *  FROM products ORDER BY created DESC";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // execute query
        $stmt->execute();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

      
            $product = $row['id'];
      
            array_push($products, $product);
        }

        return $products;
     
        // return values
        return $stmt;
    }

    public function getVehicle($id){
 
        // query to select single record
        $query = "SELECT id, name, description, image, product_gallery, price, category_id FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // sanitize
        $id=htmlspecialchars(strip_tags($id));
     
        // bind product id value
        $stmt->bindParam(1, $id);
     
        // execute query
        $stmt->execute();
     
        // get row values
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        return $row;
    }


    public function count(){
 
        // query to count all product records
        $query = "SELECT count(*) FROM " . $this->table_name;
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // execute query
        $stmt->execute();
     
        // get row value
        $rows = $stmt->fetch(PDO::FETCH_NUM);
     
        // return count
        return $rows[0];
    }
}
?>
