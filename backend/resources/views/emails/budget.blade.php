<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>   
    <strong>Nombre</strong>: {!! $name !!}<br>
    <strong>Correo</strong>: {!! $from !!} <br>
    <strong>Teléfono</strong>: {!! $phone !!}<br>
    <p>Productos:</p>
    <ul>    
        @foreach ($products as $product)
            <li>{!! $product['title'] !!} </li>
        @endforeach
    </ul>
    
</body>
</html>
