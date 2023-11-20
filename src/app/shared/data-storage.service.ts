import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from './recipe.service';
import { Observable, from, map, tap } from 'rxjs';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private firestore: Firestore) {}

  private readonly recipesCollectionRef = collection(this.firestore, 'recipes');

  createRecipe(recipe: Recipe): Observable<DocumentData> {
    return from(addDoc(this.recipesCollectionRef, recipe));
  }

  // getRecipes():Observable<Recipe[]> {
  //    return collectionData(this.recipesCollectionRef,{idField:'id'}) as Observable<Recipe[]>;
  // }

  getRecipes(): Observable<Recipe[]> {
    return from(getDocs(this.recipesCollectionRef)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const recipeData: Recipe = doc.data() as Recipe;
          recipeData.id = doc.id;
          return recipeData;
        });
        return resultList;
      })
    );
  }

  // getRecipe(id: string): Observable<Recipe> {
  //   const recipeDoc = doc(this.firestore, `recipes/${id}`);
  //   return docData(recipeDoc, { idField: 'id' }) as Observable<Recipe>;
  // }

  getRecipe(id: string) {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    return from(getDoc(recipeDoc)).pipe(
      map((doc) => {
        const recipeData: Recipe = doc.data() as Recipe;
        recipeData.id = doc.id;
        return recipeData;
      })
    );
  }

  deleteRecipe(id: string): Observable<void> {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    return from(deleteDoc(recipeDoc));
  }

  updateRecipe(recipe: Recipe): Observable<void> {
    const recipeDoc = doc(this.firestore, `recipes/${recipe.id}`);
    return from(setDoc(recipeDoc, recipe));
  }
}
