import { SectionHead } from "@/components/ui/SectionHead";
import { Stage } from "@/components/ui/Stage";
import { AppWindow } from "@/components/ui/AppWindow";
import { Pill } from "@/components/ui/Pill";
import { CellRow } from "@/components/ui/CellRow";
import { Reveal } from "@/components/ui/Reveal";
import { WindowReveal } from "@/components/ui/WindowReveal";
import { SECTIONS, LAYER_TABLE, LAYER_CELLS } from "@/lib/analysisData";

/**
 * "01 Layers" — H2 Analysis model, layer table (Layer / Question / V1 pill,
 * rows revealing one by one), then the CellRow with the real questions.
 */
export function LayersSection() {
	return (
		<section className="wrap" aria-labelledby="layers-heading">
			<SectionHead
				label={SECTIONS.layers.label}
				title={SECTIONS.layers.title}
				titleSoft={SECTIONS.layers.titleSoft}
			/>

			<Reveal>
				<Stage variant="dim" ariaLabel="Analysis layers table">
					<WindowReveal>
						<AppWindow title="Analysis layers" label="V1">
							<div className="app-window-body" style={{ paddingTop: 18, paddingBottom: 10 }}>
								<table className="layer-table">
									<thead>
										<tr>
											<th scope="col">Layer</th>
											<th scope="col">Question</th>
											<th scope="col" className="pill-cell">
												V1
											</th>
										</tr>
									</thead>
									<tbody>
										{LAYER_TABLE.map((layer, i) => (
											<Reveal key={layer.name} as="tr" delay={i * 0.04} data-dim={layer.status !== "in-scope"}>
												<td>{layer.name}</td>
												<td>{layer.question}</td>
												<td className="pill-cell">
													{layer.status === "in-scope" ? (
														<Pill variant="on">In scope</Pill>
													) : (
														<Pill>Future</Pill>
													)}
												</td>
											</Reveal>
										))}
									</tbody>
								</table>
							</div>
						</AppWindow>
					</WindowReveal>
				</Stage>
			</Reveal>

			<Reveal delay={0.08}>
				<div style={{ marginTop: 20 }}>
					<CellRow cells={LAYER_CELLS} ariaLabel="Layer questions" />
				</div>
			</Reveal>
		</section>
	);
}
