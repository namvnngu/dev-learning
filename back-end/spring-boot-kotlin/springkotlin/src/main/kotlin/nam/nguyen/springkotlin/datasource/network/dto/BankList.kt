package nam.nguyen.springkotlin.datasource.network.dto

import nam.nguyen.springkotlin.model.Bank

data class BankList (
    val results: Collection<Bank>
)