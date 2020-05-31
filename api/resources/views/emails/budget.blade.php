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
        @for ($i = 0; $i < count($products); $i++)
            <li>
                {!! $products[$i]['title'] !!}: 
                {!! $cantidades[$i] !!}
                @if ($cantidades[$i]==1)
                    unidad
                @else
                    unidades
                @endif            
            </li>
        @endfor
    </ul>
    
</body>
</html>
