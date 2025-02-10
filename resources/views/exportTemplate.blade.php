<!DOCTYPE html>
<html>

<head>
    <title>Hello Page</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            margin: 20px;
            background-color: #fafafa;
            font-size: 14px;
        }

        .semester {
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .semester h2 {
            margin-top: 0;
            color: #212121;
            font-size: 20px;
            font-weight: 500;
        }

        .subject-header, .subject {
            display: flex;
            flex-direction: row;
            border-top: 1px solid #e0e0e0;
            padding: 10px 0;
        }

        .subject-header {
            font-weight: 500;
            color: #424242;
        }

        .subject-header p {
            margin: 5px 10px;
            font-size: 14px;
        }

        .subject:first-child {
            border-top: none;
        }

        .subject p {
            margin: 5px 10px;
            font-size: 14px;
        }

        .subject .name, .subject-header .name {
            flex: 4;
        }

        .subject .code, .subject-header .code {
            flex: 2;
        }

        .subject .lecture_credits, .subject-header .lecture_credits,
        .subject .work_credits, .subject-header .work_credits {
            flex: 1;
        }

        .semester {
            margin-bottom: 30px;
        }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
        </head>

        <body>
        @foreach ($plans_subjects_grouped_by_semester as $semester)
        <div class='semester'>
            <h2>Semestre {{ $loop->iteration }}</h2>
            <div class='subject-header'>
            <p class="name">Nome</p>
            <p class="code">Código</p>
            <p class="lecture_credits">CA</p>
            <p class="work_credits">CT</p>
            </div>
            @foreach ($semester as $subject)
            <div class='subject'>
            <p class="name">{{ $subject['name'] }}</p>
            <p class="code">{{ $subject['code'] }}</p>
            <p class="lecture_credits">{{ $subject['lecture_credits'] }}</p>
            <p class="work_credits">{{ $subject['work_credits'] }}</p>
            </div>
            @endforeach
        </div>
        @if($loop->index % 2 == 0)
            @pageBreak
        @endif 
        @endforeach
        </body>

        </html>
