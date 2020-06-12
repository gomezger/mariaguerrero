<?php
$API = 'https://mariaguerrerodeco.com/api/public/';
$siteRoot = 'https://mariaguerrerodeco.com/';
$imagesUrl = 'https://mariaguerrerodeco.com/api/storage/app/public/';


$frase = $_GET['frase'];
$fragmentos = explode("/",$frase);
if(count($fragmentos)==3)
	$_GET['id'] = $fragmentos[1];


$jsonData = getData($API);
makePage($jsonData, $siteRoot, $imagesUrl);

// Request data from the API
function getData($api) {
    $id = (isset($_GET['id']) && ctype_digit($_GET['id'])) ? $_GET['id'] : 1;
    $rawData = file_get_contents($api.'products/'.$id);
    return json_decode($rawData);
}

// Prepare variables for HTML
function makePage($data, $siteRoot, $imagesUrl) {
    if(isset($data->producto)){
        $GLOBALS['imageUrl'] = $imagesUrl . $data->producto->images[0];
        $GLOBALS['pageUrl'] = $siteRoot . "producto/" . $_GET['frase'];
        $GLOBALS['title'] = $data->producto->title;
        $GLOBALS['description'] = strip_tags($data->producto->description);
    }else{
        $GLOBALS['imageUrl'] = 'https://mariaguerrerodeco.com/assets/carousel/bg-home-3.jpg';
        $GLOBALS['pageUrl'] = $siteRoot;
        $GLOBALS['title'] = 'Maria Guerrero | Muebles y Objetos';
        $GLOBALS['description'] = strip_tags('Maria Guerrero Decoración de interiores. Comercializamos y presupuestamos muebles.');
    }
}
?>

<!DOCTYPE html>
<html>
<head>
  <base href="/">
  <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <title><?php echo $title; ?></title>

    <!--META-->
    <!--facebook-->
    <!-- <meta property="fb:app_id" content="216139029176679"> -->
    <meta property="fb:admins" content="216139029176679"/>

    <!--SEO-->
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="keywords" content="decoración, muebles, objetos, <?php echo $title; ?>">
    <meta name="author" content="Maria Guerrero Muebles">

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="<?php echo $title; ?>">
    <meta itemprop="description" content="<?php echo $description; ?>">
    <meta itemprop="image" content="<?php echo $imageUrl; ?>">

    <!-- Twiter Cards -->
    <meta name="twitter:card" content="summary">
    <!-- <meta name="twitter:site" content="@InfoVillarino">  -->
    <meta name="twitter:title" content="<?php echo $title; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image:src" content="<?php echo $imageUrl; ?>">
    <!--/ Twiter Cards -->

    <!-- Open Graph -->
    <meta property="og:site_name" content="Maria Guerrero | Muebles y objetos">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php echo $title; ?>" />
    <meta property="og:url" content="<?php echo $pageUrl; ?>">
    <meta property="og:description" content="<?php echo $description; ?>">
    <meta property="og:image" content="<?php echo $imageUrl; ?>">
    <!--/ Open Graph -->

</head>
<body>
    <img src="<?php echo $imageUrl; ?>">
    <h1><?php echo $title; ?></h1>
    <p><?php echo $description; ?></p>   
</body>
</html>