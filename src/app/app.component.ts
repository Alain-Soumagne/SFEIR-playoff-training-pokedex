import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PokedexService} from './services/pokedex.service';
import {JsonPipe, NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {Pokemon, PokemonEntry, PokemonSpecies} from './interfaces/pokedexResponse';
import {MatToolbar} from '@angular/material/toolbar';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LimitPipe} from './pipes/limit.pipe';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, MatToolbar, MatAutocomplete, MatOption, MatInput, ReactiveFormsModule, MatAutocompleteTrigger, LimitPipe, MatFormField, NgOptimizedImage, UpperCasePipe, MatCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private pokedexService = inject(PokedexService);

  protected pokemonList = signal<PokemonEntry[]>([]);
  protected searchResults = signal<PokemonEntry[]>([]);
  protected pokemon = signal<Pokemon | null>(null);
  protected pokemonSpecies = signal<PokemonSpecies | null>(null);

  protected searchInput = new FormControl<string>('');

  constructor() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (search) => {
          const results = this.pokemonList().filter((pokemon) => pokemon.pokemon_species.name.startsWith(search || ''))
          this.searchResults.set(results);
        }
      });
  }

  ngOnInit() {
    this.pokedexService.getPokemonFromRegion().subscribe({
      next: ({ pokemon_entries }) => {
        this.pokemonList.set(pokemon_entries);
        this.searchResults.set(pokemon_entries);
      }
    });

  }

  onOptionSelected($event: MatAutocompleteSelectedEvent) {
    this.pokedexService.searchForPokemonByName($event.option.value).subscribe({
      next: (response) => this.pokemon.set(response)
    });

    this.pokedexService.searchForPokemonSpeciesByName($event.option.value).subscribe({
      next: (response) => this.pokemonSpecies.set(response)
    });
  }
}
