<div class="card-body">
	<div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
		<div class="row">
			<div class="col-sm-12 col-md-6">
				<div class="dataTables_length" id="example_length">
					<label
						>Show <select
							name="example_length"
							aria-controls="example"
							class="custom-select custom-select-sm form-control form-control-sm"
							><option value="10">10</option><option value="25">25</option><option value="50"
								>50</option
							><option value="100">100</option></select
						> entries</label
					>
				</div>
			</div>
			<div class="col-sm-12 col-md-6">
				<div id="example_filter" class="dataTables_filter">
					<label
						>Search:<input
							type="search"
							class="form-control form-control-sm"
							placeholder=""
							aria-controls="example"
						/></label
					>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<table
					style="width: 100%;"
					id="example"
					class="table table-hover table-striped table-bordered dataTable dtr-inline"
					role="grid"
					aria-describedby="example_info"
				>
					<thead>
						<tr
							><th
								class="sorting_asc"
								tabindex="0"
								aria-controls="example"
								rowspan="1"
								colspan="1"
								style="width: 143.2px;"
								aria-sort="ascending"
								aria-label="Name: activate to sort column descending">Name</th
							><th
								class="sorting"
								tabindex="0"
								aria-controls="example"
								rowspan="1"
								colspan="1"
								style="width: 225.2px;"
								aria-label="Position: activate to sort column ascending">Position</th
							><th
								class="sorting"
								tabindex="0"
								aria-controls="example"
								rowspan="1"
								colspan="1"
								style="width: 102.2px;"
								aria-label="Office: activate to sort column ascending">Office</th
							><th
								class="sorting"
								tabindex="0"
								aria-controls="example"
								rowspan="1"
								colspan="1"
								style="width: 47.2px;"
								aria-label="Age: activate to sort column ascending">Age</th
							><th
								class="sorting"
								tabindex="0"
								aria-controls="example"
								rowspan="1"
								colspan="1"
								style="width: 102.2px;"
								aria-label="Start date: activate to sort column ascending">Start date</th
							><th
								class="sorting"
								tabindex="0"
								aria-controls="example"
								rowspan="1"
								colspan="1"
								style="width: 79.2px;"
								aria-label="Salary: activate to sort column ascending">Salary</th
							></tr
						>
					</thead>
					<tbody>
						<tr class="odd">
							<td class="sorting_1 dtr-control">Airi Satou</td>
							<td>Accountant</td>
							<td>Tokyo</td>
							<td>33</td>
							<td>2008/11/28</td>
							<td>$162,700</td>
						</tr><tr class="even">
							<td class="sorting_1 dtr-control">Angelica Ramos</td>
							<td>Chief Executive Officer (CEO)</td>
							<td>London</td>
							<td>47</td>
							<td>2009/10/09</td>
							<td>$1,200,000</td>
						</tr><tr class="odd">
							<td class="sorting_1 dtr-control">Ashton Cox</td>
							<td>Junior Technical Author</td>
							<td>San Francisco</td>
							<td>66</td>
							<td>2009/01/12</td>
							<td>$86,000</td>
						</tr><tr class="even">
							<td class="sorting_1 dtr-control">Bradley Greer</td>
							<td>Software Engineer</td>
							<td>London</td>
							<td>41</td>
							<td>2012/10/13</td>
							<td>$132,000</td>
						</tr><tr class="odd">
							<td class="sorting_1 dtr-control">Brenden Wagner</td>
							<td>Software Engineer</td>
							<td>San Francisco</td>
							<td>28</td>
							<td>2011/06/07</td>
							<td>$206,850</td>
						</tr><tr class="even">
							<td class="sorting_1 dtr-control">Brielle Williamson</td>
							<td>Integration Specialist</td>
							<td>New York</td>
							<td>61</td>
							<td>2012/12/02</td>
							<td>$372,000</td>
						</tr><tr class="odd">
							<td class="sorting_1 dtr-control">Bruno Nash</td>
							<td>Software Engineer</td>
							<td>London</td>
							<td>38</td>
							<td>2011/05/03</td>
							<td>$163,500</td>
						</tr><tr class="even">
							<td class="sorting_1 dtr-control">Caesar Vance</td>
							<td>Pre-Sales Support</td>
							<td>New York</td>
							<td>21</td>
							<td>2011/12/12</td>
							<td>$106,450</td>
						</tr><tr class="odd">
							<td class="sorting_1 dtr-control">Cara Stevens</td>
							<td>Sales Assistant</td>
							<td>New York</td>
							<td>46</td>
							<td>2011/12/06</td>
							<td>$145,600</td>
						</tr><tr class="even">
							<td class="sorting_1 dtr-control">Cedric Kelly</td>
							<td>Senior Javascript Developer</td>
							<td>Edinburgh</td>
							<td>22</td>
							<td>2012/03/29</td>
							<td>$433,060</td>
						</tr></tbody
					>
					<tfoot>
						<tr
							><th rowspan="1" colspan="1">Name</th><th rowspan="1" colspan="1">Position</th><th
								rowspan="1"
								colspan="1">Office</th
							><th rowspan="1" colspan="1">Age</th><th rowspan="1" colspan="1">Start date</th><th
								rowspan="1"
								colspan="1">Salary</th
							></tr
						>
					</tfoot>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 col-md-5">
				<div class="dataTables_info" id="example_info" role="status" aria-live="polite">
					Showing 1 to 10 of 57 entries
				</div>
			</div>
			<div class="col-sm-12 col-md-7">
				<div class="dataTables_paginate paging_simple_numbers" id="example_paginate">
					<ul class="pagination">
						<li class="paginate_button page-item previous disabled" id="example_previous">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="0"
								tabindex="0"
								class="page-link">Previous</a
							>
						</li>
						<li class="paginate_button page-item active">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="1"
								tabindex="0"
								class="page-link">1</a
							>
						</li>
						<li class="paginate_button page-item">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="2"
								tabindex="0"
								class="page-link">2</a
							>
						</li>
						<li class="paginate_button page-item">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="3"
								tabindex="0"
								class="page-link">3</a
							>
						</li>
						<li class="paginate_button page-item">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="4"
								tabindex="0"
								class="page-link">4</a
							>
						</li>
						<li class="paginate_button page-item">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="5"
								tabindex="0"
								class="page-link">5</a
							>
						</li>
						<li class="paginate_button page-item">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="6"
								tabindex="0"
								class="page-link">6</a
							>
						</li>
						<li class="paginate_button page-item next" id="example_next">
							<a
								href="?page=1"
								aria-controls="example"
								data-dt-idx="7"
								tabindex="0"
								class="page-link">Next</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
