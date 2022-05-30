<?php require('initialize.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");
$data = file_get_contents('vehicle-data.json');
$vehicle = new Vehicle($db);

$decode = json_decode($data, true);

$count = 0;
foreach ($decode as $item) {
    $count ++;

        // trim 
        $item['trim'] = NULL;

        // seller name
        $faker = Faker\Factory::create();

        $item['seller'] = $faker->name;

        // body type
        switch ($item['bodyType']) {
            case 'Coupe':
                $item['askPrice'] = rand(5000,10000);
                $item['soldPrice'] = rand(5000,10000);
            break;
            case 'Wagon':
                $item['askPrice'] = rand(7500,10000);
                $item['soldPrice'] = rand(7500,10000);
            break;
            case 'Sedan':
                $item['askPrice'] = rand(10000,20000);
                $item['soldPrice'] = rand(10000,20000);
            break;
            case 'Midsize':
                $item['askPrice'] = rand(12500,22500);
                $item['soldPrice'] = rand(12500,22500);
            break;
            case 'SUV':
                $item['askPrice'] = rand(15000,25000);
                $item['soldPrice'] = rand(15000,25000);
            break;
            case 'Hatchback':
                $item['askPrice'] = rand(16000,26000);
                $item['soldPrice'] = rand(16000,26000);
            break;
            case 'Van':
                $item['askPrice'] = rand(17500,27500);
                $item['soldPrice'] = rand(17500,27500);
            break;
            case 'Truck':
                $item['askPrice'] = rand(20000,30000);
                $item['soldPrice'] = rand(20000,30000);
            break;
            case 'Convertible':
                $item['askPrice'] = rand(25000,35000);
                $item['soldPrice'] = rand(25000,35000);
            break;
            case 'Commercial':
                $item['askPrice'] = rand(30000,40000);
                $item['soldPrice'] = rand(30000,40000);
            break;
        }

        // buyer name
        switch ($item['make']) {
            case 'Jeep':
                $item['buyer'] = 'John Smith';
            break;
            case 'Chevrolet':
                $item['buyer'] = 'Matt Skiba';
            break;
            case 'Ford':
                $item['buyer'] = 'Patrick Star';
            break;
            case 'Acura':
                $item['buyer'] = 'Rusty Shackleford';
            break;
            case 'Dodge':
                $item['buyer'] = 'Dale Gribble';
            break;
            case 'GMC':
                $item['buyer'] = 'Bill Dautrive';
            break;
            case 'Mercedes-Benz':
                $item['buyer'] = 'Jens Soltenberg';
            break;
            case 'Volvo':
                $item['buyer'] = 'Kurt Caldwell';
            break;
            case 'Toyota':
                $item['buyer'] = 'Martin Prince';
            break;
            case 'Hyundai':
                $item['buyer'] = 'Tim Hadfield';
            break;
            case 'Nissan':
                $item['buyer'] = 'Roman Sokolovich';
            break;
            case 'Chrysler':
                $item['buyer'] = 'Seb Thomas';
            break;
            case 'Ram':
                $item['buyer'] = 'Phil Kali';
            break;
            case 'Mitsubishi':
                $item['buyer'] = 'Kris Kolaczki';
            break;
            case 'Lexus':
                $item['buyer'] = 'Arthur Kazmarz';
            break;
            case 'Infiniti':
                $item['buyer'] = 'Sly Stone';
            break;
            case 'Volkswagen':
                $item['buyer'] = 'Danai Phan';
            break;
            case 'Honda':
                $item['buyer'] = 'Rebecca Johnson';
            break;
            case 'BMW':
                $item['buyer'] = 'Ronald Genesper';
            break;
            case 'Mazda':
                $item['buyer'] = 'Thomas Bueller';
            break;
            case 'MINI':
                $item['buyer'] = 'Cindy Havenburger';
            break;
            case 'Kia':
                $item['buyer'] = 'Kathy Mile';
            break;
            case 'Ferrari':
                $item['buyer'] = 'Sarah Kerry';
            break;
            case 'Cadillac':
                $item['buyer'] = 'Jennifer Shortwater';
            break;
            case 'Audi':
                $item['buyer'] = 'Andrea Abervale';
            break;
            case 'Bentley':
                $item['buyer'] = 'Robert Mertingale';
            break;
            case 'Pontiac':
                $item['buyer'] = 'Meghan Thompson';
            break;
            case 'Subaru':
                $item['buyer'] = 'Lars Dampton';
            break;
            case 'Porsche':
                $item['buyer'] = 'Sally Holyfield';
            break;
            case 'Lincoln':
                $item['buyer'] = 'Shamar Jackson';
            break;
            case 'FIAT':
                $item['buyer'] = 'Kelly Burtington';
            break;
            case 'Land Rover':
                $item['buyer'] = 'Adam Grandson';
            break;
        }

        // sold date
        $datestart = strtotime('2020-02-10');
        $dateend = strtotime('2022-05-24');
        $daystep = 86400;
        $datebetween = abs(($dateend - $datestart) / $daystep);
        $randomday = rand(0, $datebetween);

        $item['soldDate'] = date("Y-m-d", $datestart + ($randomday * $daystep));

        // status

        $status = ['sold', 'listed', 'parked', 'unsold'];
        $status_rand = rand(0, 3);

        $item['status'] = $status[$status_rand];

        // transmission
        if (empty($item['transmission'])) {
            $item['transmission'] = 'Unknown';
        }

        if (empty($item['fuelType'])) {
            $item['fuelType'] = 'Unknown';
        }

        if ($count % 4 == 0){     
            $item['buyer'] = '';
        }

}


?>