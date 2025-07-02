<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @extends Model<Course>
 */
class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
}
