<script lang="ts">
	import { workouts } from './lib/data.json';
	const getDayName = (date = new Date(), locale = 'en-US') => {
		return date.toLocaleDateString(locale, { weekday: 'long' });
	};
	const currentLevel: string = 'beginner';
	const currentWeight: number = 10;

	const maxSets: number = 3;
	const minReps: number = 8;
	const levels: string[] = ['beginner', 'intermediate', 'expert'];
	const generateWorkoutLevels = async (): Promise<Map<string, { sets: number[]; reps: number[] }>> => {
		let generatedWorkoutLevels: Map<string, { sets: number[]; reps: number[] }> = new Map<string, { sets: number[]; reps: number[] }>();
		levels.forEach(async (key, index) => {
			if (!(levels.length > maxSets)) {
				index++;
				let reps: number[] = [];
				let sets: number[] = [];
				Array.from(Array(index).keys(), (n) => n + 1).forEach((i) => {
					reps.push(minReps * i);
				});
				Array.from(Array(index).keys(), (n) => n + 1).forEach((i) => {
					sets.push(i);
				});
				generatedWorkoutLevels.set(key, { sets: sets, reps: reps.reverse() });
			}
		});
		return generatedWorkoutLevels;
		// console.log(generatedWorkoutLevels);
		// return new Promise<Map<string, { sets: number[]; reps: number[] }>>((resolve) => {
		// 	setTimeout(() => {
		// 		resolve(generatedWorkoutLevels);
		// 	}, 0);
		// });
	};
	let page = 0;
	let navigate = ({ next, prev }) => {
		next ? page++ : '';
		prev ? page-- : '';
	};
	let todaysWorkouts = new Map(Object.entries(workouts[getDayName().toLowerCase()]));
	$: currentWorkout = todaysWorkouts.get(Array.from(todaysWorkouts.keys())[page]);
</script>

<div class="mx-auto flex min-h-screen max-w-sm flex-col py-4">
	<header class="flex w-full flex-col items-center justify-center pb-4">
		<div class="prose pb-4">
			<h2 class="mb-0 text-center uppercase">Saitamas Intense Training Regime</h2>
			<p class="mt-0 text-center uppercase"><small>modified</small></p>
		</div>
		<img src="/saitama-icon-27.jpg" alt="saitamas-intense-training-regime-modified" class="w-32" />
	</header>
	<div class="prose py-4">
		<h2 class="text-center">{getDayName()} Workouts</h2>
	</div>
	<main class="container flex flex-1 flex-col">
		<div class="flex flex-1 flex-col items-center justify-center">
			<div class="card-compact card w-full overflow-hidden bg-base-300 shadow-xl">
				{#await generateWorkoutLevels()}
					loading
				{:then data}
					<video playsinline preload="metadata" muted autoplay loop class="workout-img overflow-hidden" src={currentWorkout['video']} />
					<div class="card-body">
						<p class="badge-success badge font-bold">{Array.from(todaysWorkouts.keys())[page].toUpperCase()}</p>
						<h2 class="card-title">{currentWorkout['name']}</h2>
						<div class="overflow-x-auto">
							<table class="table w-full">
								<thead>
									<tr>
										<th />
										{#each [...data] as level}
											{#if level[0] === currentLevel}
												{#each level[1].sets as set}
													<th>Set {set}</th>
												{/each}
											{/if}
										{/each}
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>Reps</th>
										{#each [...data] as level}
											{#if level[0] === currentLevel}
												{#each level[1].reps as rep}
													<th>{rep}</th>
												{/each}
											{/if}
										{/each}
									</tr>
									<tr>
										<th>Weight</th>
										{#each [...data] as level}
											{#if level[0] === currentLevel}
												{#each level[1].reps as rep}
													<td>{currentWeight} Kg</td>
												{/each}
											{/if}
										{/each}
									</tr>
								</tbody>
							</table>
						</div>
						<div class="card-actions mt-4 justify-between">
							<button on:click={() => navigate({ next: false, prev: true })} class={`btn-neutral btn w-2/5 font-bold ${page > 0 ? 'visible' : 'invisible'}`}>Previous</button>
							<button on:click={() => navigate({ next: true, prev: false })} class={`btn-primary btn w-2/5 font-bold ${page + 1 === todaysWorkouts.size ? 'invisible' : 'visible'}`}>Next</button>
						</div>
					</div>
				{/await}
			</div>
		</div>
	</main>
</div>
