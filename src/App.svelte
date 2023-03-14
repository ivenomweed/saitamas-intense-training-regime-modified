<script lang="ts">
	import { onMount } from 'svelte';
	const getDayName = (date = new Date(), locale = 'en-US') => {
		return date.toLocaleDateString(locale, { weekday: 'long' });
	};
	const currentLevel: string = 'beginner';

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
		// return generatedWorkoutLevels;
		console.log(generatedWorkoutLevels);
		return new Promise<Map<string, { sets: number[]; reps: number[] }>>((resolve) => {
			setTimeout(() => {
				resolve(generatedWorkoutLevels);
				console.log('delayed');
			}, 0);
		});
	};
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
					<video playsinline preload="metadata" muted autoplay loop class="workout-img overflow-hidden" src="https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1" />
					<div class="card-body">
						<p class="badge-success badge font-bold">Muscle Group</p>
						<h2 class="card-title">Workout Name</h2>
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
										<td>10 Kg</td>
										<td>10 Kg</td>
										<td>10 Kg</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="card-actions mt-4 justify-between">
							<button class="btn-neutral btn w-2/5 font-bold">Previous</button>
							<button class="btn-primary btn w-2/5 font-bold">Next</button>
						</div>
					</div>
				{/await}
			</div>
		</div>
	</main>
</div>
