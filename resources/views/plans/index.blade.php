@extends('main')
@section('content')
  @foreach ($plans as $plan)
    @include('plans.partials.fields')
  @endforeach
@endsection